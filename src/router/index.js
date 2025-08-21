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
        path: '/Cast&Crew/:id',
        name: 'Cast&Crew',
        component: () => import('@/views/CastAndCrew.vue'),
        props: true
    },

    {
        path: '/Person/:id',
        name: 'PersonSingle',
        component: () => import('@/views/PersonSingle.vue'),
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
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition; // Revenir à la position précédente
        } else {
            return { top: 0, behavior: 'auto' }; // Scroll en haut, sans animation
        }
    }

})


export default router