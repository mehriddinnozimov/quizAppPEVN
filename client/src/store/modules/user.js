import { getMe, logout, update, updateAvatar } from '../../server/user'

import db from '../../db'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
	namespaced: true,
	state() { return {
		data: null,
		auth: {
			isProcessing: false,
			error: "",
		}
	}},
	actions: {
		async onAuthChange(_, cb){
			_.dispatch("toast/success", "success", { root: true })
			await _.dispatch("getUser")
			if(!_.state.auth.isProcessing) cb(_.state.data)
		},
		async getUser(_) {
			_.commit("setAuthIsProcessing", true)
			const data = await getMe()
			console.log(data)
			if(data.ok) {
				_.commit("setUser", data.user)

			} else {
				_.commit("setAuthError", data.error)
				_.dispatch("toast/error", data.error, { root: true })

			}
			_.commit("setAuthIsProcessing", false)

		},
		async logoutUser(_, cb){
			const data = await logout()
			if(data.ok){ 
				_.dispatch("toast/success", "You are logged out", { root: true })
				_.commit("setUser", null)
				cb()
			} else {
				_.dispatch("toast/error", data.err, { root: true })
			}
		},
		async updateUser(_, user){
			const data = await update(user)
			console.log(data)
			if(data.ok){
				_.dispatch("toast/success", "User updated!", {root: true})
				await _.dispatch("getUser")
			} else {
				_.dispatch("toast/error", data.error, { root: true })
			}
		},
		async uploadImage(_, {file, onSuccess}){
			try {
				const tag = file.name.split(".").pop()
				if(!["png", "jpeg", "jpg"].includes(tag)) {
					_.dispatch("toast/error", 'Unallowed tag. "jpg", "jpeg" or "png" are allowed', { root: true })
					return
				}
				const storage = getStorage()
				const storageRef = ref(storage, 'quizImages/'+file.name)
				const uploadResult = await uploadBytes(storageRef, file.bytes)
				const downloadUrl = await getDownloadURL(uploadResult.ref) 
				onSuccess(downloadUrl)
				_.dispatch("updateAvatarUser", downloadUrl)
			} catch (err) {
				_.dispatch("toast/error", err.message, { root: true })
			}
		},
		async updateAvatarUser(_, url){
			const data = await updateAvatar({url: url})
			if(data.ok){
				_.dispatch("toast/success", "Avatar changed successfully", { root: true })
				_.dispatch("getUser")
			} else {
				_.dispatch("toast/error",data.error, { root: true })
			}
		}
	},
	mutations: {
		setUser(state, user){
			state.data = user
		},
		setAuthIsProcessing(state, p){
			state.auth.isProcessing = p
		},
		setAuthError(state, error){
			state.auth.error = error
		}
	},
	getters: {
		isAuthenticated(state){ return !!state.data }
	}
}