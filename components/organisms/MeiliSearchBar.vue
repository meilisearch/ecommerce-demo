<script lang="ts" setup>
import { AisSearchBox } from 'vue-instantsearch/vue3/es'
import { VueFinalModal } from 'vue-final-modal'

const fileInput = ref<HTMLInputElement | null>(null);
const showModal = ref(false);
const statusMessage = ref('');

const { setResults } = useSearchStore()
const { uploadFile, generateDescription, generateEmbedding, vectorSearch, uploadedImageUrl, resetImageSearch } = useImageSearch();

const updateStatus = (message: string) => {
  statusMessage.value = message;
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

    updateStatus('Performing vector search...');
    console.log('Performing vector search...');
    await vectorSearch(embedding);

    // Close modal after search is completed
    showModal.value = false;

    // Reset the input
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
    content-class="max-w-md p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg"
  >
    <div class="text-center">
      <h3 class="text-lg font-medium mb-2">Image Search Status</h3>
      <p>{{ statusMessage }}</p>
    </div>
  </VueFinalModal>
</template>
