/**
 * @author Harsh Gupta
 */

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import '@/assets/style/tailwind.scss';
import '@/assets/style/app.scss';

const app = createApp(App);
app.use(store);
app.use(router);
router.isReady().then(() => {
  app.mount('#app');
});
