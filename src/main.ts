import '@/assets/styles/index.scss';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import pinia from './stores';

import { setupMock } from '@/mocks';

setupMock();

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
