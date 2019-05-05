
const rootGet = {}
rootGet.func = async (req, res) => {
	res.status(200).json({ data: 'Heartbeat heard' })
}

module.exports = {
	rootGet
}