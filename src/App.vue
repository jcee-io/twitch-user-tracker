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
          <p>Viewing: {{ view }}</p>
        </div>
        <div id="mini-box" >
          <p v-if="view === 'All' || view ==='Online'" v-for="user in online">
            {{ user.username }}
            {{ user.stream.game }}
          </p>
          <p v-if="view === 'All' || view ==='Offline'" v-for="user in offline">
            {{ user.username }}
            {{ user.stream.game }}
          </p>
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
      online: [],
      offline: [],
      view: 'All',
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
    width: 400px;
    margin: 4vh auto;
    height: auto;
  }

  #button-box {
    display: flex;
    justify-content: space-between;
    background: green;
    height: 40px;
    margin: 0 auto;
    padding: 10px 0;
  }

  .status-select {
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
    margin-top: 7%;
  }
  #status-box {
    background: rgba(255, 248, 160, 0.6);
    text-align: center;
    color: green;
  }

  #status-box p {
    margin: 0;
    font-size: 1.5em;
  }
  #mini-box {
    background: rgba(255, 248, 160, 0.6);
    height: 700px;
    padding: 20px;
  }

  #mini-box p {
    margin: 0;
    margin-bottom: 10px;
  }
</style>
