const { checkToken, userFromToken, orgFromUser } = require("../middleware/v2TokenManager");
const { readToken } = require("../middleware/v2returnToken");
// const { check } = require("express-validator/check");

const Router = require('express-promise-router')
const expRtr = new Router()

// ROUTES
const heartbeat = require(`./v2/heartbeat`);
const cal = require(`./v2/cal`);
const elig = require(`./v2/elig`);
// const home = require(`./v2/home`);
const inv = require(`./v2/inv`);
const login = require(`./v2/login`);
const org = require(`./v2/org`);
const refer = require(`./v2/refer`);

// NO TOKEN REQUIRED
expRtr.use([readToken])
expRtr.use(`/login`, login);
// END NO TOKEN REQUIRED
// TOKEN REQUIRED
expRtr.use([checkToken,userFromToken,orgFromUser]);
expRtr.use(`/heartbeat`, heartbeat);
expRtr.use(`/cal`, cal);
expRtr.use(`/elig`, elig);
// expRtr.use(`/home`, home);
expRtr.use(`/inv`, inv);
expRtr.use(`/org`, org);
expRtr.use(`/refer`, refer);
// END TOKEN REQUIRED

// EXPORT
module.exports = expRtr;