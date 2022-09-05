import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import StyleClass from 'primevue/styleclass';


createApp(App).use(PrimeVue).directive('styleclass', StyleClass).mount('#app');


