
import login from '../auth/components/login.vue';
import signup from '../auth/components/signup.vue'
import Users from '../components/Users.vue';
import home from '../components/home.vue';
import profile from '../components/profile.vue';
import PrivacyPolicy from '../components/PrivacyPolicy.vue';
import TermsAndConditions from '../components/TermsAndConditions.vue';
import About from '../components/About.vue'
export const routes = [
    { path: '/', component: login },
    { path: '/alert-list', component: Users },
    { path: '/signup', component: signup },
    { path: '/home', component: home },
    { path: '/profile', component: profile },
    { path: '/privacy-policy', component: PrivacyPolicy},
    { path: '/terms-and-conditions', component: TermsAndConditions},
    { path: '/About-us', component: About}




  ];