import  {createRouter, createWebHistory} from 'vue-router'

import UpcomingView  from "@/views/UpcomingView.vue";
import PopularView  from "@/views/PopularView.vue";
import NowPlaying from "@/views/NowPlaying.vue";

const routes = [


    {
        path: '/now-playing',
        name:'NowPlayingMovies',
        component: NowPlaying
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
    },

    {
        path: '/film/:id',
        name: 'FilmSingle',
        component: () => import('@/views/FilmSingle.vue'),
        props: true
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue') // Créez ce composant
    },




]





const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router