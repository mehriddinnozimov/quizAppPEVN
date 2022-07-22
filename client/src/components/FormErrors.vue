<template>
	<div
    class="form-error">
    <div class="help is-danger" v-for="error of this.errors" :key="error.$uid">{{ error.$message }}</div>
  </div>
</template>

<script>
export default {
	props: {
		errors: {
			type: Array,
			required: true
		}
	}
}
</script>