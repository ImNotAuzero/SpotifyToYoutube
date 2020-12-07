/* jshint esversion: 9 */

const readline = require('readline-sync');
const ytscraper = require('scrape-yt');
const chalk = require('chalk');
const auth = require('./auth.json');
let Spotify = require('node-spotify-api');
let spotify = new Spotify({ id: auth.spotify.client, secret: auth.spotify.secret });

let url = readline.question('Input a spotify URL: ');
while(!url.includes('spotify.com')) url = readline.question('Input a spotify URL: ');

let newUrl = String(url.split(/(?<name>https:\/\/open.spotify.com\/track\/)/g)[2]).split('?');

spotify.request(`https://api.spotify.com/v1/tracks/${newUrl[0]}`)
  .then(async (res) => {
    if(res.is_local) {
      readline.question('Track is a local track... Press any key to exit.');
      return process.exit(1);
      //return console.log('Track is a local track...');
    }
    await searchYT(res);
  })
  .catch(async (e) => {
    if(e) return console.log(e);
  })

async function searchYT(data) {
  ytscraper.search(`${data.name} by ${data.artists[0].name}`)
    .then(async (res) => {
      if(!res.length) {
        readline.question('Track was not found on youtube... Press any key to exit');
        return process.exit(1);
      }
      console.log(`Track was found on Youtube!\n\nTrack Name: ${chalk.blue(res[0].title)} Length: ${chalk.blue(res[0].duration + 's')}\nThumbnail: ${chalk.blue(res[0].thumbnail)}\nURL: https://www.youtube.com/watch?v=${res[0].id}`)
      readline.question('\nPress any key to exit...');
      return process.exit(1);
    })
    .catch(async (e) => {
      if(e) return console.log(e);
    })
}