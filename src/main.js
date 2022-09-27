// Vue config imports
import { createApp } from 'vue';
import App from './App.vue';
import { routes } from "./router/router.js";
import * as VueRouter from 'vue-router';
// config imports end

// PrimeVue component imports
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeicons/primeicons.css'
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Alert from './components/Alert.vue';
import canAccess from './auth/canAccess';
import Password from 'primevue/password';
import Card from 'primevue/card';

//Prime Vue imports end

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

router.beforeEach(async (to, from) => {
    console.log(to.fullPath)
    const isAuth = await canAccess()
    if(to.fullPath !== '/' && to.fullPath !== '/signup'){
        if (!isAuth) 
        {return '/'}
    }
    else{
        if (isAuth) {
            return false    
        }
    }
    
  })

const app = createApp(App);
app
.use(PrimeVue, {ripple: true})
.use(ToastService)
.use(Alert)
.use(router)
.use(Password)
;
app.config.globalProperties.API_URL = import.meta.env.VITE_api;
app.component("Button", Button);
app.component("DataTable", DataTable);
app.component("Toast", Toast);
app.component("Column", Column);
app.component("Alert", Alert);
app.component("Password", Password);
app.component("Card", Card);





app.mount('#app')