
import login from '../auth/components/login.vue';
import signup from '../auth/components/signup.vue'
import Users from '../components/Users.vue';
import home from '../components/home.vue'
import profile from '../components/profile.vue'

export const routes = [
    { path: '/', component: login },
    { path: '/users', component: Users },
    { path: '/signup', component: signup },
    { path: '/home', component: home },
    { path: '/profile', component: profile }



  ];