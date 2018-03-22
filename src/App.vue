<template>
  <div id="app">
    <div id="main-box">
      <div id="main-box-container">
        <h1 id="header">Twitch User Tracker</h1>
        <div id="status-box">
          <p v-if="loading">Loading Users...</p>
          <p v-if="!loading">Viewing: {{ view }}</p>
        </div>
        <div id="button-box">
          <div v-on:click="switcher" class="status-select"><span>All</span></div>
          <div v-on:click="switcher" class="status-select"><span>Online</span></div>
          <div v-on:click="switcher" class="status-select"><span>Offline</span></div>
        </div>
        <div>
          <form>
            <input class="form-control">
            <button class="status-select">Add</button>
          </form>
        </div>
        <div id="mini-box" >
          <div class="user user-entry" v-if="view === 'All' || view ==='Online'" v-for="user in online">
            <img v-bind:src="user.logo">
            <p>
              <strong><a class="username" v-bind:href="twitch + user.username" target="_blank">{{ user.username }}</a></strong> -
              {{ user.stream.game }}
              <span class="user-status">
                 {{ user.stream.channel.status }}
              </span>
            </p>      
          </div>
          <div class="user user-entry-offline" v-if="view === 'All' || view ==='Offline'" v-for="user in offline">
            <img v-bind:src="user.logo">
            <p>
              <strong><a class="username" v-bind:href="twitch + user.username" target="_blank">{{ user.username }}</a></strong> -
              {{ user.stream.game }}
            </p>      
          </div>
        </div> 
      </div>
      
    </div>
  </div>
</template>

<script>
import Promise from 'bluebird'

export default {
  data () {
    return {
      users: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
      twitch: 'http://twitch.tv/',
      online: [],
      offline: [],
      view: 'All',
      loading: true,
      api: 'https://wind-bow.glitch.me/twitch-api/streams/',
      profileApi: 'https://wind-bow.glitch.me/twitch-api/users/'
    }
  },
  created(){
    const promises = [];
    const images = [];
    for(let user of this.users) {
      promises.push(this.$http.get(this.api + user));
      images.push(this.$http.get(this.profileApi + user));
    }

    Promise.all(promises)
      .then(data => {
        this.users = data.map((d, i) => ({ username: this.users[i], ...d.body }));
        

        this.users.forEach(d => {
          if(!d.stream) {
            d.stream = {
              game: 'Offline'
            }
            this.offline.push(d);
          } else {
            this.online.push(d);
          }
        });

        

        return Promise.all(images); 
      })
      .then(data => {
        const logos = data.map(d => d.body.logo);
        this.users.forEach((d, i) => d.logo = logos[i]);

        this.loading = false;
      });
  },
  methods: {
    switcher: function(event) {
      this.view = event.target.textContent;
    }
  }
}
</script>

<style>
  #header {
    text-align: center;
    color: green;
    margin: 20px 0 0 0;
    font-size: 3em;
  }
  img {
    width: 50px;
    display: inline-block;
    margin: 0;
    border-radius: 100px;
    border-style: solid;
    border-color: rgba(255, 248, 160, 0.6);
  }
  body {
    background: green;
    padding: 40px 70px;
  }

  form {
    display: flex;
    height: 35px;
    padding: 0 20px;
    transform: translateY(10px);
  }
  #main-box {
    background: rgba(255, 250, 181, 0.8);
    height: 90vh;
    overflow: hidden;
  }

  #main-box-container {
    max-width: 600px;
    width: 70vw;
    margin: 4vh auto;
    height: auto;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(255, 248, 160, 0.6);
  }

  #button-box {
    display: flex;
    justify-content: space-around;
    background: green;
    height: 55px;
    margin: 0 auto;
    padding: 10px 0;
  }

  .status-select {
    border-radius: 10px ;
    width: 120px;
    height: 100%;
    margin: 0 10px;
    background: rgba(255, 248, 160, 0.7);
    color: green;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    transition-duration: 200ms;
  } 

  .status-select:hover {
    background: rgba(255, 248, 160, 1);
  }
  .status-select span {
    display: block;
    margin-top: 3%;
  }
  #status-box {
    padding-bottom: 20px;
    text-align: center;
    color: green;
  }

  #status-box p {
    margin: 0;
    font-size: 1.5em;
  }
  #mini-box {
    height: 600px;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #mini-box p {
    
    display: inline-block;
  }

  .user {
    padding: 0 5px;
    margin-bottom: 10px;
    border-radius: 10px;
  }
  .user-status {
    display: block;
    font-size: 15px;
  }
  .user-entry {

    background: green;
  }

  .user-entry img {
    transform: translateY(-12px);
  }
  .user-entry p {
    margin: 2% 0;
  }
  .user-entry-offline {
    background: grey;
  }
  .user-entry-offline p {
    margin: 4% 0;
  }
  .username {
    text-decoration: none;
    color: inherit;
  }

  .username:hover {
    text-decoration: none;
    color: rgba(255, 248, 160, 0.6);
  }
</style>
