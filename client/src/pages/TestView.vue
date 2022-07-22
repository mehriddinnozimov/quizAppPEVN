<template>
	<div class="columns">
		<div class="column is-one-quarter">
			<TestViewLeft :test="test" :start="start" :started="started" v-if="!!test"></TestViewLeft>
		</div>
		<div class="column">
			<TestViewRight v-if="started" :done="done" :questions="test?.questions" :fetchAnswers="fetchAnswers" ></TestViewRight>
		</div>
	</div>

</template>

<script>
import TestViewLeft from '../components/TestViewLeft'
import TestViewRight from '../components/TestViewRight'

export default {
	created(){
		const { testId } = this.$route.params
		this.$store.dispatch("test/getTestById", testId)
	},
	computed: {
		test(){ return this.$store.getters["test/getTest"] }
	},
	methods: {
		start(){
			this.started = true
		},
		fetchAnswers(questionId, variantId){
			if(this.answers.findIndex(answer => answer.questionId == questionId) > -1) {
				const index = this.answers.findIndex(answer => answer.questionId == questionId)
				this.answers[index].variantId = variantId
			} else {
				this.answers.push({questionId, variantId})
			}
		},
		done(){
			this.$store.dispatch("result/createResult", {testId: this.test.id, answers: this.answers, onSuccess: () => this.$router.push("/profile") })
		}
	},
	data(){ return {
		started: false,
		answers: []
	} },
	components: {
		TestViewLeft,
		TestViewRight
	}
}
</script>