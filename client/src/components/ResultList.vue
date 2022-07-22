<template>
	<TableVue :table="table" v-if="table.heads"></TableVue>
	<div class="content has-text-centered mt-3" v-else>You don't have a result yet</div>
</template>

<script>
import TableVue from './Table'

export default {
	components: {
		TableVue
	},
	computed: {
		table(){ return this.$store.getters["result/getResultsInfoForTable"] }
	},
	methods: {
		edit(id){ console.log("edit", id) },
		remove(id) { console.log("remove", id) }
	}
}
</script>