<p align="center">
  <img src="https://raw.githubusercontent.com/meilisearch/integration-guides/master/assets/logos/logo.svg" alt="Meilisearch" width="200" height="200" />
</p>

<h1 align="center">Meilisearch Nuxt 3 ecommerce demo</h1>

<h4 align="center">
  <a href="https://github.com/meilisearch/MeiliSearch">MeiliSearch</a> |
  <a href="https://docs.meilisearch.com">Documentation</a> |
  <a href="https://discord.gg/meilisearch">Discord</a> |
  <a href="https://www.meilisearch.com">Website</a> |
  <a href="https://docs.meilisearch.com/faq">FAQ</a>
</h4>

<p align="center">
  <a href="https://github.com/meilisearch/demo-movies/blob/main/LICENCE"><img src="https://img.shields.io/badge/license-MIT-informational" alt="License"></a>
</p>
<br/>

## 🧰 Stack

This project requires:

- [Node 18](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/) — Node.js packages manager
- [Nuxt 3](https://nuxt.com) — Web application framework based on [Vue 3](https://vuejs.org/)
- [Meilisearch](https://meilisearch.com) — Fast, relevant search engine

## 🛠️ Setup

### Dependencies

> **Warning**
> Ensure that you are using a Node version compatible with the one in `.nvmrc`.

Install the dependencies with Yarn:

```bash
yarn install
```

### Environment

Environment variables should hold your Meilisearch database credentials. The easiest way to launch a database is to [create a free project](https://cloud.meilisearch.com/) on Meilisearch Cloud. Alternatively, you can read [local installation](https://docs.meilisearch.com/learn/getting_started/installation.html#local-installation) documentation for self-hosted options.

This project loads environment variables from an `.env` file. You can duplicate the existing `.env.example` file and rename it as `.env`. Update the content of the file to match your credentials.

```bash
# .env

# Meilisearch configuration
MEILISEARCH_HOST="use the Database URL here"
MEILISEARCH_ADMIN_API_KEY="use the Default Admin API Key here"
MEILISEARCH_SEARCH_API_KEY="use the Default Search API Key here"

# Image optimization configuration
TWICPICS_DOMAIN=https://meilisearch-ecommerce.twic.pics
STORYBOOK_TWICPICS_DOMAIN=https://meilisearch-ecommerce.twic.pics
```

> This application uses [TwicPics](https://twicpics.com/) to deliver optimized images. You don’t need to update the related environment variables. 

### Database

Run the setup script to configure and seed your Meilisearch instance:

```bash
yarn setup
```

## 🧑‍💻 Development

> **Note**
> Make sure to complete instructions from the Setup section before running the server.

Start the development server on http://localhost:3000

```bash
yarn dev
```

## 🚀 Deployment

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## ✨ Storybook

This project uses [Storybook v7](https://storybook.js.org/) to document components. The `vite.config.ts` is used by Storybook to enable auto-imports and path aliases.

Open Storybook by running:

```bash
yarn storybook
```

> Output files `auto-imports.d.ts` and `components.d.ts` are auto-generated and *should not* be updated manually. You can commit them into source control.

