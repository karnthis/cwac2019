const Router = require('express-promise-router')
const { rootGet, cmdPost } = require('../../controllers/dev')

const expRtr = new Router()

expRtr.route('/')
.get(rootGet.func)

expRtr.route('/:cmd')
.post(cmdPost.validate, cmdPost.func)

module.exports = expRtr