<template>
	<TableVue :table="table" v-if="table?.body" :edit="edit" :remove="remove"></TableVue>
	<div class="content has-text-centered mt-3" v-else>You don't have a test yet, <router-link to="/tests/create" class="link">click</router-link> to create one</div>
</template>

<script>
import TableVue from './Table'

export default {
	components: {
		TableVue
	},
	computed: {
		table(){ return this.$store.getters["test/getTestsInfoForTable"] }
	},
	methods: {
		edit(id){ this.$router.push(`/tests/${id}/update`) },
		remove(id) { this.$store.dispatch("test/removeById", id) }
	}
}
</script>