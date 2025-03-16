import { createRouter, createWebHistory } from 'vue-router'
import GeneralPage from '../pages/GeneralPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import AdvertisementPage from '../pages/AdvertisementPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GeneralPage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/ads',
      name: 'ads',
      component: AdvertisementPage,
    },
  ],
})

export default router
