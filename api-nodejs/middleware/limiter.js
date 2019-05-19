const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
	points: 10,
	// durations: seconds * minutes * hours
	duration: 1
})
const blockingRateLimiter = new RateLimiterMemory({
	points: 500,
	// durations: seconds * minutes * hours
	duration: 60 * 5,
	blockDuration: 60 * 60 * 12
})

function limitRequests(req, res, next) {
	blockingRateLimiter.consume(req.ip, 1) // Consume 1 point
	.then((rateLimiterRes) => {
		// Allowed
		rateLimiter.consume(req.ip, 1) // Consume 1 point
		.then((rateLimiterRes) => {
			// Allowed
			console.dir(rateLimiterRes)
			next()
		})
		.catch((rej) => {
			// Blocked
			res
			.status(423)
			.json({ data: 'Slow down! Too many requests!' })
		})
	})
	.catch((rej) => {
		// Blocked
		res
		.status(423)
		.json({ data: 'Denied Connection' })
	})



}

// not used
function getUsernameIPkey(username, ip){
	return `${username}_${ip}`
}

// EXPORT
module.exports = {
	limitRequests
}