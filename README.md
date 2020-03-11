## Crypto Charter

An application used to track prices (in USD) of Bitcoin over various time intervals. Built with React, JavaScript, and CSS.


(disclaimer: pricing data was obtained from the CoinDesk API)

## Table of Contents

1. [Demo](#demo)
1. [Additional Info](#additional-info)
1. [Setup](#setup)

## Demo

<img src="https://media.giphy.com/media/dxh8r9WvGnGvniwtrW/giphy.gif">
<img src="https://media.giphy.com/media/f6n1YJWuTwuPT26zAi/giphy.gif">

## Additional Info

This was a 2 day project with the goal of familiarizing myself more with charting technologies/ libraries. Technologies implemented in this project are React, D3, react-chartjs-2 (React wrapper for Chart.js).

Unfortunately Coindesk API data updates every minute (instead of ideally every few seconds...allowing for price ticker to animate more regularly). Second challenge was the API only provided end of day closing prices for historical dates, so in order for me to build out a "Live" view (which represented prices for the last hour) and "1Day" view (24 hour period), I needed to set up a separate server that would query the API every minute and then save the responses into a database (I utilized mongodb for this). I would then query my own API for the aforementioned views.


## Setup

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To initiate webpack:

`npm run react-dev`

To Start Server:

`npm start`  

To Visit App:

`localhost:3000`  
