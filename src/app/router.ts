import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'product-list',
      component: () => import('../features/products/pages/ProductListPage.vue'),
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../features/products/pages/ProductDetailPage.vue'),
    },
  ],
})

export default router
