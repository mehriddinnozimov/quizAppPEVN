import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faCamera, faPen, faXmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add([faGoogle, faCamera, faPen, faXmark, faCheck, faTrash])

import store from './store'
import router from './router'

import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";

let app;

store.dispatch("user/onAuthChange", () => {
	if(!app){
		app = createApp(App)
			.use(router)
		  .use(store)
		  .use(Toast)
			.component("fai", FontAwesomeIcon)
			.mount('#app')
	}

})