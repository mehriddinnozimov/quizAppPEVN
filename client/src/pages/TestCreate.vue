<template>
	<div class="columns is-fullwidth">
		<div class="column is-4">
			<TestCreateLeft :quiz="quiz" :action="createQuiz" actionTitle="Create"></TestCreateLeft>
		</div>
		<div class="column is-8">
			<TestCreateRight :questions="quiz.questions"></TestCreateRight>
		</div>
	</div>
</template>

<script>
import TestCreateLeft from '../components/TestCreateLeft'
import TestCreateRight from '../components/TestCreateRight'



export default {
	components: {
		TestCreateRight, TestCreateLeft
	},
	data(){ return {
		quiz: {
			title: "",
			subject: "",
			difficulty: "",
			questions: [{
				title: "",
				variants: [{
					value: "",
					isAnswer: true
				}]
			}]
		}
	} },
	methods: {
		createQuiz(){
			this.$store.dispatch("test/createTest", {body: this.quiz, onSuccess: () => this.$router.push("/profile")})
		}
	}
}
</script>