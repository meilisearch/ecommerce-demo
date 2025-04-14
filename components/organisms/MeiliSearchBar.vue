<script lang="ts" setup>
import { AisSearchBox } from 'vue-instantsearch/vue3/es'
import { VueFinalModal } from 'vue-final-modal'

const fileInput = ref<HTMLInputElement | null>(null);
const showModal = ref(false);
const statusMessage = ref('');

const { uploadFile, generateDescription, generateEmbedding, vectorSearch, uploadedImageUrl, resetImageSearch } = useImageSearch();

const statusMessages = ref<string[]>([]);
const updateStatus = (message: string) => {
  statusMessages.value.push(message);
  if (!showModal.value) showModal.value = true;
};

const handleFileChange = async (event: Event) => {
  try {
    if (!fileInput.value?.files?.length) {
      console.log('No file selected');
      return;
    }

    const file = fileInput.value.files[0];
    console.log('Selected file:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      throw new Error('Please select a JPEG or PNG image');
    }

    // Send upload request with the file directly
    const formData = new FormData();
    formData.append('file', file);

    updateStatus('Uploading file...');
    console.log('Uploading file...');
    const { blob } = await uploadFile(formData);
    console.log('Uploaded image URL:', uploadedImageUrl.value);

    updateStatus('Generating description...');
    console.log('Generating description...');
    const { description } = await generateDescription(blob.url);

    updateStatus('Generating embedding...');
    console.log('Generating embedding...');
    const { embedding } = await generateEmbedding(description);

    setTimeout(() => {
      showModal.value = false;
      statusMessages.value = [];
    }, 250);

    console.log('Performing vector search...');
    await vectorSearch(embedding);

    if (fileInput.value) {
      fileInput.value.value = '';
    }
  } catch (error) {
    console.error('Upload error:', error);
    updateStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    setTimeout(() => {
      showModal.value = false;
    }, 3000);
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleReset = (refine: (value: string) => void) => {
  refine('');
  resetImageSearch();
  console.log('Reset search, image URL is now:', uploadedImageUrl.value);
};
</script>

<template>
  <AisSearchBox>
    <template #default="{ currentRefinement, refine }">
      <SearchInput
        :value="currentRefinement"
        :hasImage="!!uploadedImageUrl"
        @input="refine($event.currentTarget.value)"
        @reset="handleReset(refine)"
      >
        <template #left>
          <div
            v-if="uploadedImageUrl"
            class="w-7 h-7 rounded-md overflow-hidden flex-shrink-0 mr-1"
            style="--left-slot-width: 28px;"
          >
            <img
              :src="uploadedImageUrl"
              alt="Uploaded image"
              class="w-full h-full object-cover"
            />
          </div>
        </template>

        <template #right>
          <input
            ref="fileInput"
            type="file"
            name="file"
            accept="image/jpeg,image/png"
            class="hidden"
            @change="handleFileChange"
          />
          <button type="button" class="search-input-image" @click="triggerFileInput">
            <ImageIcon class="image-icon" />
          </button>
        </template>
      </SearchInput>
    </template>
  </AisSearchBox>

  <VueFinalModal
    v-model="showModal"
    class="flex justify-center items-center"
    content-class="w-full min-h-40 max-w-md p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg"
    transition="fade-scale"
    :classes="{
      'fade-scale-enter-active': 'transition duration-300 ease-in-out',
      'fade-scale-leave-active': 'transition duration-200 ease-in-out',
      'fade-scale-enter-from': 'opacity-0 scale-95',
      'fade-scale-leave-to': 'opacity-0 scale-95',
      'fade-scale-enter-to': 'opacity-100 scale-100',
      'fade-scale-leave-from': 'opacity-100 scale-100'
    }"
  >
    <div>
      <h3 class="text-lg text-center font-medium mb-2">Image Search Status</h3>
      <div class="space-y-2">
        <TransitionGroup
          enter-active-class="transition-all duration-300 ease-in-out"
          enter-from-class="opacity-0 transform translate-y-2"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition-all duration-300 ease-in-out"
          leave-from-class="opacity-100 transform translate-y-0"
          leave-to-class="opacity-0 transform -translate-y-2"
        >
          <p class="text-ashes-900" v-for="message in statusMessages" :key="message">{{ message }}</p>
        </TransitionGroup>
      </div>
    </div>
  </VueFinalModal>
</template>
