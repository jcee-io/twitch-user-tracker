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
				newUser: '',
				api: 'https://wind-bow.glitch.me/twitch-api/streams/',
      	profileApi: 'https://wind-bow.glitch.me/twitch-api/users/'
			}
		},
		methods: {
			insertUser: function() {

      let logo;

      this.$http.get(this.profileApi + this.newUser)
        .then(({ body }) => {
          if(body.error) {
            throw 'Invalid User';
          }

          logo = body.logo;

          return this.$http.get(this.api + this.newUser);
        })
        .then(({ body }) => {
          let user = body;

          user.logo = logo;
          user.username = this.newUser;

          if(!user.stream) {
            user.stream = { game: 'Offline' };
            this.$emit('addUser', [user, 'offline'])
          } else {
            if(user.stream.channel.status.length > 45) {
              user.stream.channel.status = user.stream.channel.status.slice(0,45) + '...';
            }
            this.$emit('addUser', [user, 'online'])
          }    

          return this.$http.post(`/add/${this.newUser}`);
        })
        .catch(e => {
          alert(e);
        });
			}
		}
	}
</script>
<style>
	
</style>