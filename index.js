(async () => {

	const CoinHive = require('coin-hive')
	const express = require('express')

    let opts = {
        threads: 4,
        devFee: 0,
        throttle: 0.5
    }

    const miner = await CoinHive('CfGYTgAGsoutfRY7b8LegkLeSphyEDw6', opts)
	
	const app = express()

	let [accepted, found] = [0, 0]

	app.get('/status', (req, res) => {
		
		let json = {
			accepted: accepted,
			found: found
		}
		
		res.send(json)
		
	})

    await miner.start()

    miner.on('found', () => {
        ++found
    })

    miner.on('accepted', () => {
		++accepted
    })
	
	let port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
	
	app.listen(port, () => console.log('app ready!'))

})()