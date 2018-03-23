<template>
	<div>
    <div class="user user-entry-offline" v-if="view === 'All' || view ==='Offline'" v-for="user in users">
      <img v-bind:src="user.logo">
      <p>
        <strong><a class="username" v-bind:href="twitch + user.username" target="_blank">{{ user.username }}</a></strong> -
        {{ user.stream.game }}
      </p> 
      <button v-on:click="deleteUser(user.username)"  class="user-btn btn btn-success">Delete</button>     
    </div>
	</div>	
</template>
<script>
	export default {
		props: ['users', 'view', 'twitch'],
		methods: {
			deleteUser: function(username) {
				this.$emit('delete', username);
			}
		}
	};
</script>
<style scoped>
  .user-entry-offline {
    background: grey;
  }
  .user-entry-offline p {
    margin: 4% 0;
  }
</style>