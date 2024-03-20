import * as Vue from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import './assets/less/index.less'
import './mock'
import api from './api'
import router from "./router";
import store from "./store";
import mixin from "./utils/mixin";
import VueLazyload from '@jambonn/vue-lazyload'
import {VueMasonryPlugin} from "vue-masonry";
import {createPinia} from "pinia";
const pinia = createPinia()

// const vConsole = new VConsole();
const emitter = mitt()

const app = Vue.createApp(App)
app.config.globalProperties.$api = {...api}
app.config.globalProperties.emitter = emitter
app.config.unwrapInjectedRef = true
app.provide('mitt', emitter)
app.mixin(mixin)
const loadImage = new URL('./assets/img/icon/img-loading.png', import.meta.url).href
app.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadImage,
  attempt: 1
})
app.use(VueMasonryPlugin)
app.use(router)
app.use(store)
app.use(pinia)
app.mount('#app')
