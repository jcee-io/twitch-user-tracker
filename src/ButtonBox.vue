<template>
  <div id="button-box">
    <div v-on:click="switcher" class="status-select"><span>All</span></div>
    <div v-on:click="switcher" class="status-select"><span>Online</span></div>
    <div v-on:click="switcher" class="status-select"><span>Offline</span></div>
  </div>	
</template>
<script>
	export default {
		methods: {
			switcher: function(event) {
				this.$emit('switcher', event);
			}
		}
	}
</script>
<style scoped>
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
</style>