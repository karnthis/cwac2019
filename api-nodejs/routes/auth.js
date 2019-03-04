const Router = require('express').Router()
// const Auth = require('../authHandler')
const { makeTimestamp, runQuery, arrayToString } = require('../libs/shared')


Router.route('/')
	.get((req, res) => {
		
	})
	.post((req, res) => {
		res.send('posted')
	})