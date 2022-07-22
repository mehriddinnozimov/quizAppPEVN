<template>
	<div>
		<div lang="title is-size-4">#{{index+1}}</div>
		<div class="field is-horizontal">
			<label class="field-label is-normal">Question</label>
			<div class="control is-fullwidth">
				<input class="input is-small" type="text" placeholder="Bo`g`iz undoshini toping" v-model="question.title">
			</div>
			<div class="field ml-5">
				<button class="button is-small is-danger is-outlined" type="button" @click="() => removeQuestion(index)"><fai icon="trash"></fai></button>
			</div>
		</div>
		<template v-for="(variant, i) in question.variants">
			<CreateQuestionVariant :variant="variant" :i="i" :removeVariant="removeVariant" :isAnswer="isAnswer" ></CreateQuestionVariant>
		</template>
		
		<div class="field is-fullwidth mt-5">
			<div class="control">
				<button class="button is-info is-light is-fullwidth is-small" type="button" @click="addAnswer">Add Answer</button>		
			</div>
		</div>
	</div>
</template>

<script>
import CreateQuestionVariant from './CreateQuestionVariant'

export default {
	props: {
		question: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			required: true
		},
		removeQuestion: {
			type: Function,
			required: true
		}
	},
	methods: {
		addAnswer(){
			this.question.variants.push({ value: "", isAnswer: false })
		},
		isAnswer(i){
			this.question.variants.map((variant, ind) => {
				variant.isAnswer = ind == i
			})
		},
		removeVariant(i){
			console.log(i)
			this.question.variants.splice(i, 1)
		}
	},
	components: {
		CreateQuestionVariant
	}
}
</script>