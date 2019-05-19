
module.exports = {
	NotSupp: (req, res) => {res.status(403).send({ errors: 'Not Supported' })},
	fakeTkn: (req, res) => {res.cookie('ghSession', 'a25ldy5Ub2tlbi5ub3c=', { signed: true }).status(203).send({ msg: 'Cookie set' })},
}
