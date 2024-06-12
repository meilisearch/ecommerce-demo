export default defineAppConfig({
  ecommerce: {
    indexName: 'flipkart-products'
  },
  images: {
    twicpicsPaths: [
      { base: 'http://img5a.flixcart.com/image/', path: '/flipkart-product-images/' },
      { base: 'http://img6a.flixcart.com/image/', path: '/flipkart-product-images2/' }
    ]
  }
})
