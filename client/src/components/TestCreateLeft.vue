<template v-if="quiz">
	<div class="mb-3 has-text-centered">
		<h1 class="is-size-3">Quiz information</h1>
	</div>
	<div>
		<div class="field">
		  <label class="label">Title</label>
		  <div class="control">
		    <input class="input" type="text" placeholder="Fonetika" v-model="quiz.title">
		  </div>
		</div>
		<div class="field">
		  <label class="label">Subject</label>
		  <div class="control">
		    <input class="input" type="text" placeholder="Ona tili" v-model="quiz.subject">
		  </div>
		</div>
		<div class="field">
			<label class="label">Difficulty</label>
			<div class="control">
				<div class="select is-fullwidth">
					<select v-model="quiz.difficulty">
						<option hidden selected disabled value="0"></option>
						<option>1</option>
						<option>2</option>
						<option>3</option>
					</select>
				</div>
			</div>
		</div>
		<div class="field mt-5">
			<div class="control">
				<button class="button is-primary is-fullwidth" @click="action">{{actionTitle}}</button>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		quiz: {
			type: Object,
			required: true
		},
		action: {
			type: Function,
			required: true
		},
		actionTitle: {
			type: String,
			required: true
		}
	}
}
</script>