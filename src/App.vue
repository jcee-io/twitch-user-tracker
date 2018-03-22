<template>
  <div id="app">
    <div id="main-box">
      <div id="mini-box">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
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

  #mini-box {
    background: rgba(255, 248, 160, 0.6);
    height: 700px;
    width: 400px;
    margin: 5% auto;
  }
</style>
