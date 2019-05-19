
const rootGet = {}
rootGet.func = async (req, res) => {
	console.log(`heartbeat: ${req.myId}`)
	res.status(200).json({ data: 'Heartbeat heard' })
}

module.exports = {
	rootGet
}