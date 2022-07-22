<template>
	<div class="field has-addons">
		<label class="field-label is-small">Answer</label>
		<div class="control is-fullwidth">
			<input class="input is-small" type="text" :placeholder="'answer #'+(i+1)" v-model="variant.value">
		</div>
		<div class="control">
			<button class="button is-small" :class="{ 'is-success': variant.isAnswer, 'is-danger': !variant.isAnswer }"   type="button" @click="() => isAnswer(i)">Is Answer</button>
		</div>
		<div class="field ml-5">
			<button class="button is-small is-danger is-outlined" type="button" @click="() => removeVariant(i)"><fai icon="trash"></fai></button>
		</div>
	</div>	
</template>

<script>

export default {
	props: {
		isAnswer: {
			type: Function,
			required: true
		},
		removeVariant: {
			type: Function,
			required: true
		},
		variant: {
			type: Object,
			required: true
		},
		i: {
			type: Number,
			required: true
		}
	}
}
</script>

