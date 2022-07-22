<template>
	<div class="columns is-fullwidth" v-if="quiz">
		<div class="column is-4">
			<TestCreateLeft :quiz="quiz" :action="updateQuiz" actionTitle="Update"></TestCreateLeft>
		</div>
		<div class="column is-8">
			<TestCreateRight :questions="quiz?.questions"></TestCreateRight>
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
	created(){
		const { testId } = this.$route.params
		this.$store.dispatch("test/getTestById", testId)
	},
	computed: {
		quiz(){ return this.$store.getters["test/getTest"] }
	},
	methods: {
		updateQuiz(){
			this.$store.dispatch("test/updateTest", {body: this.quiz, onSuccess: () => this.$router.push("/profile")})
		}
	}
}
</script>