import  {createRouter, createWebHistory} from 'vue-router'


const routes = [


    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue') // Créez ce composant
    }
]





const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router