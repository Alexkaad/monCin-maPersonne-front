import  {createRouter, createWebHistory} from 'vue-router'

import UpcomingView  from "@/views/UpcomingView.vue";

const routes = [


    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue') // Créez ce composant
    },

    {
        path: '/upcoming',
        name: 'UpcomingMovies',
        component: UpcomingView
    },
]





const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router