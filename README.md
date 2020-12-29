# SpotifyToYoutube (Spotitube)
An easy way to convert Spotify URLs to Youtube equivalents

## Prerequisites
npm install spotitube

## How to use
There is a single function that you can use in order to convert urls.
However, before we get to the function. You need to initalise Spotitube. This can be done like so:

```js
let Spotitube = require('spotitube');
let spotitube = new Spotitube({ client: '<Your Spotify App Client key>', secret: '<Your Spotify App Secret key>'})
```

From there a simple function is used to convert the url. However, you must await the function to return a value. Otherwise you will recieve a Promise.
```js
// Url has to similar: This can be done via sharing the song link!
// https://open.spotify.com/track/<stuff>
(async () => { await console.log(Spot.convert('Your cool Spotify URL')); })(); // Returns an array of track urls of the Youtube equivalent.
```

### Example
```js
let Spotitube = require('spotitube');
let spotitube = new Spotitube({ client: '<Your Spotify App Client key>', secret: '<Your Spotify App Secret key>'})

(async () => { await console.log(Spot.convert('Your cool Spotify URL')); })();
```