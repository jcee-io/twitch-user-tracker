<template>
  <div id="app">
    <div id="main-box">
      <div id="main-box-container">
        <heading :view="view" :loading="loading"></heading>
        <button-box v-on:switcher="switcher($event)"></button-box>
        <add-user v-on:newUser="insertUser($event)"></add-user>
        <div id="mini-box">
          <h1 v-if="!(offline.length + online.length)">There are no users.</h1>
          <online-users v-on:delete="deleteUser($event, 'online')" v-if="!loading" :users="online" :view="view" :twitch="twitch"></online-users>
          <offline-users v-on:delete="deleteUser($event, 'offline')" v-if="!loading" :users="offline" :view="view" :twitch="twitch"></offline-users>
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
import AddUser from './AddUser'

export default {
  components: {
    'heading': Header,
    'button-box': ButtonBox,
    'add-user': AddUser,
    'online-users': OnlineUsers,
    'offline-users': OfflineUsers
  },
  data () {
    return {
      users: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
      usernames: [],
      twitch: 'http://twitch.tv/',
      newUser: '',
      online: [],
      offline: [],
      logos: [],
      view: 'All',
      loading: true,
      api: 'https://wind-bow.glitch.me/twitch-api/streams/',
      profileApi: 'https://wind-bow.glitch.me/twitch-api/users/'
    }
  },
  created(){
    const promises = [];
    const images = [];

    this.$http.get('/users')
      .then(data => {
        this.users = data.body;
        this.usernames = data.body;

      for(let user of this.users) {
        promises.push(this.$http.get(this.api + user));
        images.push(this.$http.get(this.profileApi + user));
      }

        return Promise.all(promises);
      })
      .then(data => {
        this.users = data.map((d, i) => ({ username: this.users[i], ...d.body }));

        return Promise.all(images); 
      })
      .then(data => {
        this.logos = data.map(d => d.body.logo);

        this.users.forEach(this.configureUser);

        this.loading = false;
      });
  },
  methods: {
    switcher: function(event) {
      this.view = event.target.textContent;
    },
    configureUser: function(d, i) {
      if(!d.stream) {
        d.stream = { game: 'Offline' };
        this.offline.push(d);
      } else {
        if(d.stream.channel.status.length > 45) {
          d.stream.channel.status = d.stream.channel.status.slice(0,45) + '...';
        }
        this.online.push(d);
      }

      d.logo = this.logos[i];
    },
    insertUser: function(username) {
      let logo;

      this.$http.get(this.profileApi + username)
        .then(({ body }) => {
          if(body.error) {
            throw 'Invalid User';
          }

          logo = body.logo;

          this.usernames.push(username);

          return this.$http.get(this.api + username);
        })
        .then(({ body }) => {
          let user = body;
          user.logo = logo;
          user.username = username;

          if(!user.stream) {
            user.stream = { game: 'Offline' };
            this.offline.push(user)
          } else {
            if(user.stream.channel.status.length > 45) {
              user.stream.channel.status = user.stream.channel.status.slice(0,45) + '...';
            }
            this.online.push(user);   
          }    

          return this.$http.post(`/add/${username}`);
        })
        .catch(e => {
          alert(e);
        });
    },
    deleteUser: function(username, arrayType) {
      this[arrayType] = this[arrayType].filter(user => user.username !== username);
      this.usernames = this.usernames.filter(user => user !== username);

      this.$http.delete(`/users/${username}`)
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
  }

  form {
    display: flex;
    height: 35px;
    padding: 0 20px;
    transform: translateY(10px);
  }
  #main-box {
    background: rgba(255, 250, 181, 0.8);
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  #main-box-container {
    max-width: 600px;
    width: 70vw;
    margin: 4vh auto;
    height: auto;
    border-radius: 10px;
    border-style: solid;
    border-color: green;
    border-width: 4px;
    overflow: hidden;
    background: rgba(255, 248, 160, 0.6);
  }
  #form-box {
    height: 55px;
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

  #mini-box h1 {
    color: green;
    text-align: center;
    font-size: 2em;
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
  .user-btn {
    float: right;
    transform: translate(-5px, 13px);
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
