import { createApp } from 'vue'
import App from './App.vue'
import BaseCard from './components/BaseCard.vue'
import BaseButton from './components/BaseButton.vue'
import './assets/tailwind.css'

const myApp = createApp(App)
myApp.component('base-card',BaseCard)
myApp.component('base-button',BaseButton)
myApp.mount('#app')

// createApp(App).component('base-card',BaseCard).mount('#app')