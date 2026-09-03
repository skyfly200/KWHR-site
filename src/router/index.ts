import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('../pages/HomeView.vue'), meta: { title: 'Home' } },
  { path: '/listen', name: 'listen', component: () => import('../pages/ListenView.vue'), meta: { title: 'Listen Live' } },
  { path: '/schedule', name: 'schedule', component: () => import('../pages/ScheduleView.vue'), meta: { title: 'Schedule' } },
  { path: '/about', name: 'about', component: () => import('../pages/AboutView.vue'), meta: { title: 'About' } },
  { path: '/djs', name: 'djs', component: () => import('../pages/DjsView.vue'), meta: { title: 'DJs' } },
  { path: '/djs/:slug', name: 'dj', component: () => import('../pages/DjDetailView.vue'), meta: { title: 'DJ' } },
  { path: '/forward', name: 'forward', component: () => import('../pages/ForwardView.vue'), meta: { title: 'Forward' } },
  { path: '/forward/:slug', name: 'post', component: () => import('../pages/PostView.vue'), meta: { title: 'Post' } },
  { path: '/guidelines', name: 'guidelines', component: () => import('../pages/GuidelinesView.vue'), meta: { title: 'Guidelines' } },
  { path: '/links', name: 'links', component: () => import('../pages/LinksView.vue'), meta: { title: 'Links' } },
  { path: '/contact', name: 'contact', component: () => import('../pages/ContactView.vue'), meta: { title: 'Contact' } },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('../pages/NotFoundView.vue'), meta: { title: 'Not Found' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, saved) {
    return saved ?? { top: 0 }
  },
})

router.afterEach((to) => {
  const t = to.meta.title as string | undefined
  document.title = t ? `${t} — Way High Radio` : 'Way High Radio — KWHR 90.5 FM'
})

export default router
