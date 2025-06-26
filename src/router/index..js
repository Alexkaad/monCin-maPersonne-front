import  {createRouter, createWebHistory} from 'vue-router'

import UpcomingFilm from '@/views/UpcomingFilm.vue'

const routes = [


    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue') // Créez ce composant
    },

    {
        path: '/upcoming',
        name: 'UpcomingMovies',
        component: UpcomingFilm
    },
]





const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router