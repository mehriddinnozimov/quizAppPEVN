<template>
	<div class="modal" :class="{ 'is-active': isActive }" id="modal">
	  <div class="modal-background" @click="close"></div>
	  <div class="modal-card">
	    <header class="modal-card-head">
	      <p class="modal-card-title">{{title}}</p>
	      <button class="delete" @click="close"></button>
	    </header>
	    <section class="modal-card-body">
	      <slot />
	    </section>
	  </div>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		}	
	},
	data(){ return {
		isActive: false
	} },
	methods: {
		open(){ this.isActive = true },
		close(){ this.isActive = false }
	}
}	

</script>