<template>
	<section class="hero is-primary">
		<div class="columns">
			<div class="column is-6">
				<figure class="image">
					<img src="../assets/images/hero.jpg" >
				</figure>		
			</div>
			<div class="column is-6">
				<div class="has-text-centered pt-5">
					<h1 class="title is-1">PUSH YOURSELF, BECAUSE, NO ONE ELSE IS GOING TO DO IT FOR YOU.</h1>
				</div>
			</div>
		</div>
	</section>
	<div class="py-5">
		<SearchTest></SearchTest>
	</div>

	<HeroTestList :tests="tests" v-if="!!tests" :inc="inc" :dec="dec"></HeroTestList>

</template>

<script>
import { useToast } from 'vue-toastification'
import HeroTestList from '../components/HeroTestList'
import SearchTest from '../components/SearchTest'

export default {
	name: 'HomeVue',
	computed: {
		user(){ return this.$store.state.user.data },
		tests(){ return this.$store.state.test.tests },
		page(){ return this.$store.state.test.page }
	},
	created(){
		this.$store.dispatch("test/getTests", this.page)
		this.$store.dispatch("test/getLength")
	},
	methods: {
		inc(){ this.$store.dispatch("test/incrasePage") },
		dec(){ this.$store.dispatch("test/decrasePage") }
	},
	components: {
		HeroTestList,
		SearchTest
	}
}

export const toast = useToast()

</script>

<style>
	.mt-250 {
		margin-top: 100px;
	}
</style>