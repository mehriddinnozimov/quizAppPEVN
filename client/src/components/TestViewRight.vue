<template>
	<div class="p-5">
		<div class="content my-5 box" v-for="(question, index) in questions" :key="question.id">
			<h1 class="title is-4">Question #{{index+1}}</h1>
			<h1 class="subtitle is-5">{{ question.title }}</h1>
			<div class="control" v-for="variant in question.variants" :key="variant.id">
				<label class="radio">
					<input type="radio" :name="'radio-'+question.id" @change="() => fetchAnswers(question.id, variant.id)">
					{{ variant.value }}
				</label>
			</div>
		</div>
		<div class="control">
			<button class="button is-success is-fullwidth" @click="done">Done</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		questions: {
			type: Array,
			required: true
		},
		done: {
			type: Function,
			required: true
		},
		fetchAnswers: {
			type: Function,
			required: true
		}
	}
}
</script>