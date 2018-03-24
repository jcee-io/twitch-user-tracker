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
	console.log('request made');
	client.getAsync('users')
	  .then(data => {
	  	data = data || "[]";
	  	res.send(data);
	  });
});

app.post('/add/:newUser', (req, res) => {
	console.log(req.params);
	client.getAsync('users')
	  .then(data => {
	  	data = JSON.parse(data);
	  	data.push(req.params.newUser);
	  	data = JSON.stringify(data);
	  	return client.setAsync('users', data);
	  })
	  .then(console.log);
	res.sendStatus(200);
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000);