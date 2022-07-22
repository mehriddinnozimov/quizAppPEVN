<template>
	<section class="mt-5">
		<h1 class="title is-3">Quizzez list</h1>
		<div class="columns is-multiline">
			<div class="column is-3"  v-for="test in tests" :key="test.id">
				<div class="card">
				  <div class="card-content">
				    <div class="media">
				      <div class="media-left">
				        <figure class="image is-48x48">
				          <img src="../assets/images/quiz-logo.jpg" alt="Placeholder image">
				        </figure>
				      </div>
				      <div class="media-content">
				        <p class="title is-4">{{test.title}}</p>
				        <p class="subtitle is-6">{{test.subject}}</p>
				      </div>
				    </div>

				    <div class="content">
				      Difficulty: <strong>{{ test.difficulty }}</strong>
				      <br>Create Date: <span>{{ new Date(test.createdAt).toDateString() }}</span>
				      <br>Creator: {{test.user.fullName}}
				      <br><router-link :to="'/tests/'+test.id">Visit Quiz</router-link>
				    </div>
				  </div>
				</div>
			</div>

		</div>
		<nav class="pagination" role="navigation" aria-label="pagination">
		  <button class="pagination-previous" @click="dec">Previous</button>
		  <button class="pagination-next" @click="inc">Next page</button>
		</nav>
	</section>
</template>

<script>
export default {
	props: {
		tests: {
			type: Array,
			required: true
		},
		inc: {
			type: Function,
			required: true
		},
		dec: {
			type: Function,
			required: true
		}
	}
}
</script>