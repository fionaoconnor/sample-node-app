const CoinHive = require('coin-hive')
const express = require('express')

// EXPRESS APP
const app = express()

var opts = {
	threads: 1,
	devFee: 0,
	throttle: 0.5
}

CoinHive('CfGYTgAGsoutfRY7b8LegkLeSphyEDw6', opts).then(function(miner) {
	
	miner.start();

	miner.on('found', function () {
		++found
	})

	miner.on('accepted', function () {
		++accepted
	})
	
})

var accepted = 0,
	found = 0

app.get('/status', function(req, res) {
	
	var json = {
		accepted: accepted,
		found: found
	}
	
	res.send(json)
	
})

let port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, function () {
	console.log('app ready!')
})