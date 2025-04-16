<p align="center">
  <a href="https://www.meilisearch.com/?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme" target="_blank">
    <img src="https://github.com/meilisearch/meilisearch/blob/main/assets/logo.svg" alt="Meilisearch" width="200" height="200" />
  </a>
</p>

<h1 align="center">Meilisearch Nuxt 3 ecommerce demo</h1>

<h4 align="center">
  <a href="https://www.meilisearch.com/?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme">Website</a> |
  <a href="https://www.meilisearch.com/cloud?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme">Meilisearch Cloud</a> |
  <a href="https://blog.meilisearch.com/?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme">Blog</a> |
  <a href="https://www.meilisearch.com/docs/?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme">Documentation</a> |
  <a href="https://discord.meilisearch.com/?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme">Discord</a>
</h4>

<p align="center">
  <a href="https://github.com/meilisearch/demo-movies/blob/main/LICENCE"><img src="https://img.shields.io/badge/license-MIT-informational" alt="License"></a>
</p>
<br/>

> Meilisearch is an open-source search engine that offers fast, relevant search out of the box.

## 💪 Looking to build this yourself?

Read our [Step by step guide to adding site search to your Nuxt ecommerce](https://www.meilisearch.com/blog/nuxt-ecommerce-search-guide?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme)!

## ✨ Features

This ecommerce demo uses:

- [AI-powered search](https://www.meilisearch.com/docs/learn/ai_powered_search/getting_started_with_ai_search?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme) for image search
- [Faceted search](https://www.meilisearch.com/docs/learn/fine_tuning_results/faceted_search?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme)
- [Filtering](https://www.meilisearch.com/docs/learn/fine_tuning_results/filtering?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme)
- [Sorting](https://www.meilisearch.com/docs/learn/fine_tuning_results/sorting?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme)

## 🧰 Stack

This project requires:

- [Node 18](https://nodejs.org/)
- [PNPM](https://pnpm.io/) — Node.js package manager
- [Nuxt 3](https://nuxt.com) — Web application framework based on [Vue 3](https://vuejs.org/)
- [Meilisearch](https://meilisearch.com/?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme) — Fast, relevant AI-powered search engine

This projects uses icons from [Heroicons](https://heroicons.com/) and social medias icons from [icons8](https://icons8.com/icons/collections/EnE9mEHAiX2D).

## 🛠️ Setup

### Dependencies

> **Warning**
> Ensure that you are using a Node version compatible with the one in `.nvmrc`.

Install the dependencies with PNPM:

```bash
pnpm install
```

### Environment

Environment variables hold your Meilisearch database credentials. The easiest way to launch a database is to create a project on [Meilisearch Cloud](https://meilisearch.com/cloud?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme). Alternatively, you can read [self-host Meilisearch](https://www.meilisearch.com/docs/learn/getting_started/installation?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme#local-installation).

This project loads environment variables from an `.env` file. Create an `.env` file and update it with your credentials.

```bash
# .env

# Meilisearch credentials for search
NUXT_PUBLIC_MEILISEARCH_HOST="use the Database URL here"
NUXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY="use the Default Search API Key here"
NUXT_PUBLIC_MEILISEARCH_INDEX_NAME="use your index name here"

# Meilisearch credentials for setup
MEILISEARCH_ADMIN_API_KEY="use the Default Admin API Key here"

# OpenAI credentials for generating image description and embeddings
OPENAI_API_KEY="use your OpenAI API Key here"

# Vercel token to store images
BLOB_READ_WRITE_TOKEN="use your Vercel Blob token here"

# Image optimization configuration
NUXT_PUBLIC_TWICPICS_DOMAIN=https://meilisearch-ecommerce.twic.pics
STORYBOOK_TWICPICS_DOMAIN=https://meilisearch-ecommerce.twic.pics
```

> This application uses [TwicPics](https://twicpics.com/) to deliver optimized images. You don’t need to update the related environment variables.

### Database

Seed your database using [`meilisearch-importer`](https://github.com/meilisearch/meilisearch-importer/):

```bash
meilisearch-importer \
  --url MEILISEARCH_HOST \ # Use your Meilisearch host
  --index INDEX_NAME \ # Choose an index name
  --primary-key id \
  --api-key YOUR_ADMIN_KEY \ # Use your Admin key
  --files database/dataset.jsonl
```

Run the setup script to configure and seed your Meilisearch instance:

```bash
pnpm setup
```

> [!TIP]
> The [tutorial](https://www.meilisearch.com/blog/nuxt-ecommerce-search-guide?utm_campaign=ecommerce-demo&utm_source=github&utm_medium=readme), which pertains to the code on branches `1-setup-database`, `2-search-as-you-type`, `3-advanced-search-patterns`, and `4-final`, uses a different dataset and setup script.

## 🧑‍💻 Development

> [!NOTE]
> Make sure to complete instructions from the Setup section before running the server.

Start the development server on http://localhost:3000

```bash
pnpm dev
```

Please note this project is transitioning from using custom CSS to [TailwindCSS](https://tailwindcss.nuxtjs.org/). Some code might still be using custom CSS instead of Tailwind classes.

## 🚀 Deployment

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## ✨ Storybook

This project uses [Storybook v7](https://storybook.js.org/) to document components. The `vite.config.ts` is used by Storybook to enable auto-imports and path aliases.

Open Storybook by running:

```bash
pnpm storybook
```

> Output files `auto-imports.d.ts` and `components.d.ts` are auto-generated and *should not* be updated manually. You can commit them into source control.

Learn more about [configuring Storybook for Nuxt](https://laurentcazanove.com/articles/storybook-nuxt-guide/).


