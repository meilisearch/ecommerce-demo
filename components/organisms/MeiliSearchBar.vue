<script lang="ts" setup>
import { AisSearchBox } from 'vue-instantsearch/vue3/es'

const fileInput = ref<HTMLInputElement | null>(null);

const { setResults } = useSearchStore()
const { uploadFile, generateDescription, generateEmbedding, vectorSearch } = useImageSearch();

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

    console.log('Uploading file...');
    const { blob } = await uploadFile(formData);
    console.log('Generating description...');
    const { description } = await generateDescription(blob.url);
    console.log('Generating embedding...');
    const { embedding } = await generateEmbedding(description);
    console.log('Performing vector search...');
    await vectorSearch(embedding);

    // Reset the input
    if (fileInput.value) {
      fileInput.value.value = '';
    }

  } catch (error) {
    console.error('Upload error:', error);
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};
</script>

<template>
  <AisSearchBox>
    <template #default="{ currentRefinement, refine }">
      <SearchInput
        :value="currentRefinement"
        @input="refine($event.currentTarget.value)"
        @reset="refine('')"
      >
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
</template>
