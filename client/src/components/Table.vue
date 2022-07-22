<template>
	<table class="table is-fullwidth is-hoverable">
		<thead>
			<tr>
				<th v-for="head in table.heads" :key="head.k">{{ head.t }}</th>
				<th v-if="edit">Edit</th>
				<th v-if="remove">Remove</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in table.body" :key="`k-${item['id']}`" >
				<template v-for="head in table.heads">
					<th v-if="head.k == 'id'">{{index+1}}</th>
					<td v-else>
						<router-link v-if="item[head.k].l" :to="item[head.k].l">{{ item[head.k].t }}</router-link>
						<template v-else>{{item[head.k].t}}</template>
					</td>
				</template>
				<td v-if="edit"><button  @click="() => edit(item['id'])" class="button is-white is-small"><fai icon="pen" class="has-text-info"></fai></button></td>
				<td v-if="remove"><button @click="() => remove(item['id'])"  class="button is-white is-small"><fai icon="trash" class="has-text-danger"></fai></button></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	name: 'TableVue',
	props: {
		table: {
			type: Object,
			required: true
		},
		edit: {
			type: Function,
			default: null
		},
		remove: {
			type: Function,
			default: null
		}
	}
}
</script>