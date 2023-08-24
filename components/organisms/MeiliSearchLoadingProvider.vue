<template>
  <div v-if="state">
    <slot name="default" :is-search-stalled="state.searchMetadata.isSearchStalled" />
  </div>
</template>

<script>
import { createWidgetMixin } from 'vue-instantsearch/vue3/es'

const connectSearchMetaData =
  (renderFn, unmountFn) =>
    (widgetParams = {}) => ({
      init () {
        renderFn({ searchMetadata: {} }, true)
      },

      render ({ searchMetadata }) {
        renderFn({ searchMetadata }, false)
      },

      dispose () {
        unmountFn()
      }
    })

export default {
  mixins: [createWidgetMixin({ connector: connectSearchMetaData })]
}
</script>
