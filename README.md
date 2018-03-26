# Twitch User Tracker
LIVE LINK: http://twitch-tracker.herokuapp.com

> This application will track a users activity on Twitch. There are some things to consider:
> 1) Does not update in real time, this would require either a repeated setTimeout invocation or websockets with Twitch's servers
> 2) Not mobile friendly, future update on that
> 3) Redis caching uses your public ip as a key to maintain persistence of tracking users without collisions (still not a perfect solution)
> 4) streamAPI and usersAPI files are not included, please create these JS files and export a link with an empty endpoint  (i.e. instead of api.com/:username, you just export api.com/)
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080 (comes with express server)
npm start 
npm run dev // on another terminal window

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
