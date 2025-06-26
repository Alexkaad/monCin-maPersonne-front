import  {createRouter, createWebHistory} from 'vue-router'

import UpcomingView  from "@/views/UpcomingView.vue";
import PopularView  from "@/views/PopularView.vue";

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

    {
        path: '/popular',
        name: 'PopularMovies',
        component: PopularView
    }
]





const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router