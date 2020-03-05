import VueRouter from 'vue-router'

import Hello from '../components/hello.vue'
import World from '../components/world.vue'
import Left from '../components/left.vue'
import Right from '../components/right.vue'
import CN from '../components/cn.vue'
import USA from '../components/usa.vue'
import Error from '../components/error.vue'


let router =  new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'hello',
            components: {
                default: Hello,
                left: Left,
                right: Right
            }
        },
        {
            path: '/hello',
            name: 'hello',
            components: {
                default: Hello,
                left: Left,
                right: Right
            }
        },
        {
            path: '/world',
            name: 'world',
            component: World,
            children: [
                {
                    path: '/cn',
                    name: 'cn',
                    component: CN
                },
                {
                    path: '/usa',
                    name: 'USA',
                    component: USA
                }
            ]
        },
        {
            path: '*',
            name: 'error',
            component: Error
        }
    ]
})

export default router;