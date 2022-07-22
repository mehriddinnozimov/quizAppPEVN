<template>
	<form>
		<div class="columns">
			<div class="column is-11">
				<div class="field">
				  <label class="label">First Name</label>
				  <div class="control">
				    <input class="input" type="text" placeholder="Mehriddin" :disabled="isDisabled" v-model="data.firstName">
				  </div>
				 	<FormErrors :errors="v$.data.firstName.$errors" />
				</div>
				<div class="field">
				  <label class="label">Last Name</label>
				  <div class="control">
				    <input class="input" type="text" placeholder="Nozimov" :disabled="isDisabled" v-model="data.lastName">
				  </div>
				  <FormErrors :errors="v$.data.lastName.$errors" />
				</div>
				<div class="field">
				  <label class="label">Info</label>
				  <div class="control">
				    <input class="input" type="text" placeholder="Backend Developer" :disabled="isDisabled" v-model="data.info">
				  </div>
				  <FormErrors :errors="v$.data.info.$errors" />
				</div>
			</div>
			<div class="column is-1 is-fullheight is-flex is-align-items-center">
				<div>
					<button class="button is-white block is-medium" @click="toggleDisabled" type="button">
					  <fai icon="pen" v-if="isDisabled" class="has-text-info is-size-5"></fai>
					  <fai icon="xmark" v-else class="has-text-danger is-size-5"></fai>
					</button>
					<button class="button is-white block is-medium" @click="updateProfile" :disabled="isDisabled" type="button">
					  <fai icon="check" class="has-text-success"></fai>
					</button>					
				</div>
			</div>
		</div>
	</form>
</template>

<script>
import useAuth from '../composition/useAuth'
import FormErrors from '../components/FormErrors'

import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'

export default {
	data(){ return {
		isDisabled: true,
		data: { firstName: this.user.firstName, lastName: this.user.lastName, info: this.user.info },
		isValid: false
	} },
	watch: {
		data: {
		  async handler(){
		    const isValid = await this.v$.$validate()
		  	this.isValid = isValid
		  },
		  deep: true
		}
	},
	validations(){ return { data : {
		firstName: { required: true, minLength: minLength(2), maxLength: maxLength(20) },
		lastName: { minLength: minLength(2), maxLength: maxLength(30) },
		info: { maxLength: maxLength(300) }
	}} },
	methods: {
		toggleDisabled(){ 
			this.isDisabled = !this.isDisabled
			this.data =  { firstName: this.user.firstName, lastName: this.user.lastName, info: this.user.info }
		},
		updateProfile() {
			if(this.isValid) this.$store.dispatch("user/updateUser", this.data)
		}
	},
	setup(){ return { ...useAuth(), v$: useVuelidate() } },
	components: {
		FormErrors
	}
}
</script>