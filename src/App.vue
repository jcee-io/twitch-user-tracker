<template>
  <div id="app">
    <div id="main-box">
      <div id="button-box">
        <div class="status-select"></div>
        <div class="status-select"></div>
        <div class="status-select"></div>
      </div>
      <div id="status-box">
        <p>Viewing: {{ view }}</p>
      </div>
      <div id="mini-box">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
      view: 'All'
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


  #button-box, #mini-box, #status-box {
    width: 400px;
  }
  #button-box {
    display: flex;
    justify-content: space-between;
    background: green;
    height: 40px;
    margin: 0 auto;
    margin-top: 2.5%;
    padding: 10px 0;
  }

  .status-select {
    width: 120px;
    height: 100%;
    margin: 0 10px;
    background: rgba(255, 248, 160, 0.4);
  } 

  #status-box {
    background: rgba(255, 248, 160, 0.6);
    margin: 0 auto;
    height: auto;
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
    margin: 0 auto 5% auto;
  }
</style>
