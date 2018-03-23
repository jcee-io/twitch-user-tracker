<template>
  <div id="app">
    <div id="main-box">
      <div id="main-box-container">
        <heading :view="view" :loading="loading"></heading>
        <button-box v-on:switcher="switcher($event)"></button-box>
        <div>
          <form>
            <input class="form-control">
            <button class="btn btn-outline-dark">Add</button>
          </form>
        </div>
        <div id="mini-box">
          <online-users v-if="!loading" :users="online" :view="view" :twitch="twitch"></online-users>
          <offline-users v-if="!loading" :users="offline" :view="view" :twitch="twitch"></offline-users>
        </div> 
      </div>
      
    </div>
  </div>
</template>

<script>
import Promise from 'bluebird'
import Header from './Header'
import ButtonBox from './ButtonBox'
import OnlineUsers from './OnlineUsers'
import OfflineUsers from './OfflineUsers'
export default {
  components: {
    'heading': Header,
    'button-box': ButtonBox,
    'online-users': OnlineUsers,
    'offline-users': OfflineUsers
  },
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
            if(d.stream.channel.status.length > 55) {
              d.stream.channel.status = d.stream.channel.status.slice(0,55) + '...';
            }
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

  .username {
    text-decoration: none;
    color: inherit;
  }

  .username:hover {
    text-decoration: none;
    color: rgba(255, 248, 160, 0.6);
  }
</style>
