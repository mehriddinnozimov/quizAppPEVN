import { createStore } from 'vuex'

import user from './modules/user'
import toast from './modules/toast'
import test from './modules/test'
import result from './modules/result'

export default createStore({
	state() {
		return {
			brand: {
				link: "/",
				image: "logo.png"
			},
      routes: [
        {text: "Home", link: "/"},
        {text: 'About', link: '/about'}
      ]
		}
	},
	modules: {
		toast,
		user,
		test,
		result
	}
})