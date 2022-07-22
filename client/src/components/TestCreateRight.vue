<template v-if="questions.length > 0">
	<div class="mb-3 has-text-centered">
		<h1 class="is-size-3">Questions</h1>
	</div>
	<div class="is-scrollable">
		<template v-for="(question, index) in questions">
			<CreateQuestion class="my-3" :question="question" :index="index" :removeQuestion="removeQuestion"></CreateQuestion>
		</template>

		<div class="control is-medium mt-5">
			<button class="button is-info is-fullwidth" @click="addQuestion" type="button">Add Question</button>
		</div>
	</div>
</template>

<script>
import CreateQuestion from './CreateQuestion'

export default {
	components: {
		CreateQuestion
	},
	props: {
		questions: {
			type: Array,
			required: true
		}
	},
	methods:{
		addQuestion(){
			this.questions.push({
				title: "",
				variants: [{
					value: "",
					isAnswer: false
				}]
			})
		},
		removeQuestion(i){
			this.questions.splice(i, 1)
		}
	}
}

</script>