<template>
	<nav class="navbar mb-5" role="navigation" aria-label="main navigation">
	  <div class="navbar-brand">
	    <a class="navbar-item" :href="brand.link">
	      <img src="../assets/images/logo.png" width="120" height="60">
	    </a>

	    <a role="button" class="navbar-burger" :class="{'is-active': isActive }" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isActive = !isActive">
	      <span aria-hidden="true"></span>
	      <span aria-hidden="true"></span>
	      <span aria-hidden="true"></span>
	    </a>
	  </div>

	  <div class="navbar-menu" :class="{'is-active': isActive}">
	    <div class="navbar-end">
	    	<router-link class="navbar-item" v-for="item in menu" :key="item.text" :to="item.link">{{item.text}}</router-link>
	    	<template v-if="isAuthenticated">
	    		<router-link class="navbar-item" to="/profile">Profile</router-link>
	    		<router-link class="navbar-item" to="/tests/create">Create Quiz</router-link>
	    		<div class="navbar-item clickable" @click="() => $store.dispatch('user/logoutUser', () => this.$router.push('/'))">Logout</div>
	    	</template>
	      <div class="navbar-item" v-else>
	        <div class="buttons">
	          <a href="http://localhost:8000/auth/google" class="is-danger button is-outlined"><fai :icon="['fab', 'google']"></fai>oogle</a>
	        </div>
	      </div>
	    </div>
	  </div>
	</nav>
</template>

<script>
import useAuth from '../composition/useAuth'
export default {
	name: 'NavbarVue',
	computed: {
		brand() { return this.$store.state.brand },
		menu() { return this.$store.state.routes }
	},
	setup(){ return { ...useAuth() } },
	data(){ return {
		isActive: false
	}},
	created(){
    window.addEventListener("resize", this.handleWindowResize)
  },
  unmounted(){
    window.removeEventListener("resize", this.handleWindowResize)
  },
  methods: {
    handleWindowResize(e){
      if(this.isActive && e.target.innerWidth > 1020) this.isActive = false
    }
  }
}
</script>

<style>
.navbar-item img {
	max-height: 3rem!important;
}
</style>