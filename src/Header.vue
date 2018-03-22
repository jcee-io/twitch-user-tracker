<template>
	<div>
    <h1 id="header">Twitch User Tracker</h1>
    <div id="status-box">
      <p v-if="loading">Loading Users...</p>
      <p v-if="!loading">Viewing: {{ view }}</p>
    </div>		
	</div>
</template>
<script>
	export default {
		props: ['view', 'loading']
	};
</script>
<style scoped>
  #header {
    text-align: center;
    color: green;
    margin: 20px 0 0 0;
    font-size: 3em;
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
</style>