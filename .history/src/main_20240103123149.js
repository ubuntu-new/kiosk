/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

import './assets/styles/dine.css'
import './assets/styles/product.css'
import './assets/styles/max.css'
import './assets/styles/test.scss'
import '~bootstrap'
import '~bootstrap-vue'

// Composables
import { createApp } from 'vue'
import { createStore } from "vuex";

import storeIndex from "./store"

import VueSidePanel from 'vue3-side-panel';
import 'vue3-side-panel/dist/vue3-side-panel.css'


// Install
// Vue.use(
//     VueCssDoodle
// );

const store = createStore(storeIndex);
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(store)

app.use(VueSidePanel);

registerPlugins(app)

app.mount('#app')
