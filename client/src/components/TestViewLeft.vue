<template>
	<ModalVue ref="modalRef" title="Profile View">
		<div>
			  <article class="media">
			    <div class="media-left">
			      <figure class="image is-128x128">
			        <img :src="test?.user.avatar" alt="Image">
			      </figure>
			    </div>
			    <div class="media-content">
			      <div class="content">
			        <p>
			          <strong>{{ test?.user.fullName }}</strong>
			          <br>
			          {{ test?.user.info }}
			        </p>
			        <p>
			        	<router-link :to="`/users/${test.user.id}`">View Profile</router-link>
			        </p>
			      </div>
			    </div>
			  </article>
		</div>
	</ModalVue>
	<div class="my-5 content">
		<h1 class="title is-2">Title: <span class="has-text-primary">{{test?.title}}</span></h1>
		<p class="subtitle is-5">Subject: {{ test?.subject }}</p>
		<p class="subtitle is-6">Creator: <span class="clickable has-text-info" @click="modal.open()">{{ test?.user.fullName }}</span></p>
		<p class="is-size-6">Count: {{test?.questions.length}}</p>
	</div>
	<div class="has-text-centered" v-if="!started">
		<button class="button is-large is-info" @click="start">Start</button>
	</div>
</template>

<script>
import ModalVue from './Modal'

export default {
	data(){ return {
		modalOpen: false
	} },
	props: {
		test: {
			type: Object,
			required: true
		},
		start: {
			type: Function,
			required: true
		},
		started: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	components: {
		ModalVue
	},
	computed: {
		modal(){ return this.$refs.modalRef }
	}
}
</script>