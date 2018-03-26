<template>
  <div id="form-box">
    <form v-on:submit.prevent="insertUser">
      <input v-model="newUser" class="form-control">
      <button class="btn btn-outline-dark">Add</button>
    </form>
  </div>	
</template>
<script>
	export default {
		data() {
			return {
				newUser: ''
			}
		},
		methods: {
			insertUser: function() {
				this.$emit('newUser', this.newUser);
			}
		}
	}
</script>
<style>
	
</style>