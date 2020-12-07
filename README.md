# SpotifyToYoutube
Convert Spotify URLs to Youtube URLs!

## Prerequisites
You will need to generate a Spotify web application, to gain your Spotify client and secret tokens.
You will NOT need Youtube tokens as no tokens are required on this repo.

You will need to create an auth.json file. This repo does not support ENV files.
The auth.json file should look like:
```
{
  "spotify": {
    "client": "",
    "secret": ""
  }
}
```

## How to use
To launch the app
```
node .
```
From there, key in the Spotify URL and the output will be a Youtube URL, alongside the track name, channel name, thumbnail url and the track length in seconds.

