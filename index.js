/* jshint esversion: 9 */

/** Imports */
let ytscraper = require('scrape-yt');
let Spotify = require('node-spotify-api');

class Spotitube {
  /**
   * @param {Object} auth - Containing Spotify keys
   */
  constructor(auth) {
    if(!auth || !auth.client || !auth.secret) {
      throw new Error(`Spotify client and secret keys must be supplied via an object.`);
    }
    this.auth = { id: auth.client, secret: auth.secret };
    this.spotify = new Spotify({ id: this.auth.id, secret: this.auth.secret });
  }

  /**
   * Function used to convert urls
   * @param {String} url - The Spotify URL
   * 
   * @returns {Array} With Youtube equivalent data
   */
  async convert(url) {
    if(!url || !url.includes('spotify.com')) throw new Error(`No or an Invalid Spotify URL was provided.`);
    return await this._convert(url);
  }

  /**
   * Sub function to convert stuff
   * @private
   * @param {String} url - The Spotify URL
   * 
   * @returns {Array} Array of Youtube URLS
   */
  async _convert(url) {
    /** Split url to contain track ID only */
    let newUrl = String(url.split(/(?<name>https:\/\/open.spotify.com\/track\/)/g)[2]).split('?');

    return new Promise(async (resolve, reject) => {
      await this.spotify.request(`https://api.spotify.com/v1/tracks/${newUrl[0]}`, async (err, data) => {
      if(err) throw new Error(err);
      let results = await this.ytSearch(data), tracks = [];
      results.forEach(track => { tracks.push(`https://www.youtube.com/watch?v=${track.id}`);});
      return resolve(tracks);
      });
    });
  }

  /**
   * Function used to search Youtube for the song
   * @private
   * @param {Object} data of Spotify song data
   * 
   * @returns {Object} Object With youtube equivalent data
   */
  async ytSearch(data) {
    return await ytscraper.search(`${data.name} by ${data.artists[0].name}`);
  }
}

module.exports = Spotitube;