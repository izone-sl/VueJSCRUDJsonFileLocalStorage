import Vue from 'vue'
import VueRouter from 'vue-router'

import addStaff from './components/addStaff.vue'; 
import viewstaffHome from './components/viewhome.vue'; 

Vue.use(VueRouter)

const router  = new VueRouter ({

    mode  :'history',
    routes:[  
            {path: "/", component:viewstaffHome},
            {path: "/add", component:addStaff},
           ]
});

export default router