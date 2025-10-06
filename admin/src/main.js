import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import naive from 'naive-ui';

const app = createApp(App);

// Using app
app
  .use(createPinia())
  .use(router)
  .use(naive)
  .mount('#app');
