import { createApp } from 'vue'
import App from './App.vue'
import BaseCard from './components/BaseCard.vue'
import './assets/tailwind.css'

const myApp = createApp(App)
myApp.component('base-card',BaseCard)
myApp.mount('#app')

// createApp(App).component('base-card',BaseCard).mount('#app')