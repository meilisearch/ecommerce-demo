<template>
  <nav class="p-5 navbar">
    <div class="mobile-nav">
      <div class="mb-5 menu">
        <NuxtLink to="/">
          <BaseLogo />
        </NuxtLink>
        <SocialLink url="https://github.com/meilisearch/ecommerce-demo" icon="github" title="View the code" class="ml-auto" />
        <SocialLink url="https://blog.meilisearch.com/nuxt-ecommerce-search-guide/?utm_campaign=ecommerce-demo&utm_source=demo" icon="web" title="Read the guide" class="ml-2" />
        <form @submit.prevent="handleFileUpload" class="inline-block">
          <label class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
            Upload Photo
            <input
              ref="fileInput"
              type="file"
              name="file"
              accept="image/jpeg,image/png"
              class="hidden"
              required
            >
          </label>
        </form>
      </div>
      <div class="mr-5 mobile-search-bar">
        <slot name="search" />
      </div>
    </div>
    <div class="tablet-nav">
      <BaseLogo class="mr-5" />
      <div class="tablet-search-bar">
        <slot name="search" />
      </div>
      <SocialLink url="https://github.com/meilisearch/ecommerce-demo" icon="github" title="View the code" class="mr-3" />
      <SocialLink url="https://blog.meilisearch.com/nuxt-ecommerce-search-guide/?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme" icon="web" title="Read the guide" />
      <form @submit.prevent="handleFileUpload" class="inline-block">
        <label class="ml-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
          Upload Photo
          <input
            ref="fileInput"
            type="file"
            name="file"
            accept="image/jpeg,image/png"
            class="hidden"
            required
          >
        </label>
        <button type="submit" class="ml-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
          submit
        </button>
      </form>
    </div>
  </nav>
</template>

<script setup lang="ts">
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileUpload = async (event: Event) => {
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

    const response = await fetch(`/api/upload`, {
      method: 'POST',
      body: formData,
    });
    console.log('Upload response status:', response.status);

    const result = await response.json();
    console.log('Upload result:', result);

    if (!response.ok) {
      throw new Error(`Upload failed: ${result.message || response.statusText}`);
    }

    console.log('Upload successful!');

    // Reset the input
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  } catch (error) {
    console.error('Upload error:', error);
  }
};
</script>

<style>
.navbar {
  background-color: var(--white);
  padding-left: calc(2 * var(--size-5));
  padding-right: calc(2 * var(--size-5));
}

.tablet-nav {
  display: none;
}

.mobile-nav .menu {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.mobile-search-bar {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .tablet-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .tablet-search-bar {
    margin-left: var(--size-5);
    margin-right: var(--size-5);
    flex-grow: 1;
  }
  .mobile-nav {
    display: none;
  }
}

@media screen and (min-width: 1024px) {
  .tablet-search-bar {
    margin-left: calc(4 * var(--size-5));
    margin-right: calc(4 * var(--size-5));
  }
}
</style>
