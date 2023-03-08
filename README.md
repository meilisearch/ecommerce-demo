<p align="center">
  <img src="https://raw.githubusercontent.com/meilisearch/integration-guides/master/assets/logos/logo.svg" alt="Meilisearch" width="200" height="200" />
</p>

<h1 align="center">Meilisearch Nuxt 3 ecommerce demo</h1>

<h4 align="center">
  <a href="https://github.com/meilisearch/MeiliSearch">MeiliSearch</a> |
  <a href="https://docs.meilisearch.com">Documentation</a> |
  <a href="https://slack.meilisearch.com">Slack</a> |
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

> **Warning**
> Ensure that you are using a Node version compatible with the one in `.nvmrc`.

Install the dependencies with Yarn:

```bash
yarn install
```

### Development Server

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

