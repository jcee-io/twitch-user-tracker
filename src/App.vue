<template>
  <div id="app">
    <div id="main-box">
      <div id="main-box-container">
        <div id="button-box">
          <div v-on:click="switcher" class="status-select"><span>All</span></div>
          <div v-on:click="switcher" class="status-select"><span>Online</span></div>
          <div v-on:click="switcher" class="status-select"><span>Offline</span></div>
        </div>
        <div id="status-box">
          <p v-if="loading">Loading Users...</p>
          <p v-if="!loading">Viewing: {{ view }}</p>
        </div>
        <div id="mini-box" >
          <div class="user user-entry" v-if="view === 'All' || view ==='Online'" v-for="user in online">
            <p>
              <strong><a class="username" v-bind:href="twitch + user.username" target="_blank">{{ user.username }}</a></strong> -
              {{ user.stream.game }}
              <span class="user-status">
                 {{ user.stream.channel.status }}
              </span>
            </p>      
          </div>

          <div class="user user-entry-offline" v-if="view === 'All' || view ==='Offline'" v-for="user in offline">
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
      api: 'https://wind-bow.glitch.me/twitch-api/streams/'
    }
  },
  created(){
    const promises = [];

    for(let user of this.users) {
      promises.push(this.$http.get(this.api + user));
    }

    Promise.all(promises)
      .then(data => {
        this.users = data.map((d, i) => ({ username: this.users[i], ...d.body }));
        console.log(this.users);

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
  body {
    background: green;
    padding: 40px 70px;
  }

  #main-box {
    background: rgba(255, 250, 181, 0.8);
    height: 90vh;
    overflow: hidden;
  }

  #main-box-container {
    width: 600px;
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
    padding-top: 20px;
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
  }

  #mini-box p {
    margin: 0;
  }

  .user {
    padding: 10px 5px;
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
  .user-entry-offline {
    background: grey;
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
