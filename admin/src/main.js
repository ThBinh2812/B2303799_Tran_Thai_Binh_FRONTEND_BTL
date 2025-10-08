import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faBuilding, faChartBar, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import naive from 'naive-ui';

const app = createApp(App);

library.add(faSearch, faBuilding, faChartBar, faPen, faTrash);
app.component('font-awesome-icon', FontAwesomeIcon);


// Using app
app
  .use(router)
  .use(naive)
  .mount('#app');
