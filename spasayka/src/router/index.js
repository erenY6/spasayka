import { createRouter, createWebHistory } from 'vue-router'
import GeneralPage from '../pages/GeneralPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import AdvertisementPage from '../pages/AdvertisementPage.vue'
import SheltersPage from '../pages/SheltersPage.vue'
import AuthPage from '../pages/AuthPage.vue'

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
    {
      path: '/shelters',
      name: 'shelters',
      component: SheltersPage,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
    },
    {
      path: '/ad/:id',
      name: 'IndividualAd',
      component: () => import('@/pages/IndividualAdPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
