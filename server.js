const express = require('express');
const path = require('path');
const Promise = require('bluebird');
const bodyParser = require('body-parser');
const redis = Promise.promisifyAll(require('redis'));
const publicIp = require('public-ip');

const app = express();
const client = redis.createClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'index.html')));

app.get('/users', (req, res) => {
	let globalIp;
	publicIp.v4()
	  .then(ip => {
	  	console.log(ip);
	  	globalIp = ip;
	  	return client.getAsync(ip);
	  })
	  .then(data => {
	  	if(!data) {
	  		data = data || "[]";
	  	}
	  	res.send(data);
	  	return client.setAsync(globalIp, data);
	  });
});

app.delete('/users/:username', (req, res) => {
	let globalIp;
	publicIp.v4()
	  .then(ip => {
	  	globalIp = ip;
	  	return client.getAsync(ip);
	  })
	  .then(data => {
	  	data = JSON.parse(data);
	  	data = data.filter(username => username !== req.params.username);
	  	data = JSON.stringify(data);
	  	return client.setAsync(globalIp, data);
	  })
	  .then(console.log);
	  res.sendStatus(200);
});

app.post('/add/:newUser', (req, res) => {
	let globalIp;
	publicIp.v4()
	  .then(ip => {
	  	globalIp = ip;
	  	console.log(ip);
	  	return client.getAsync(ip);
	  })
	  .then(data => {
	  	data = JSON.parse(data);
	  	data.push(req.params.newUser);
	  	data = JSON.stringify(data);
	  	return client.setAsync(globalIp, data);
	  })
	  .then(console.log);
	res.sendStatus(200);
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000);