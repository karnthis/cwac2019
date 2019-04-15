const { check, param, validationResult } = require("express-validator/check");
const DB = require("../../core/db");
const { sanitize, makeUpdates } = require("../../core/funcs");

//*	done
const cols = [
	"provider_id",
	"provider_name",
	"phone",
	"description",
	"hours",
	"days_of_operation",
	"last_verified"
];
const tbl = "PROVIDERS";

const saniValues = [
	'provider_name',
	'phone',
	'hours',
	'description',
	'days_of_operation'
]

const rootGet = {};
const rootPost = {};
const orgidGet = {};
const orgidPut = {};

rootGet.func = async (req, res) => {
	console.log('hit')
	const { rows } = await DB.query(`SELECT ${cols} FROM ${tbl}`)
	.catch(err => console.log(err))
	res.status(200).json({ data: rows });
};

rootPost.validate = [
	check("provider_name")
		.isLength({ min: 3 })
		.trim()
		.escape(),
	check("phone")
		.isMobilePhone()
		.trim()
		.escape(),
	check("hours")
		.isLength({ min: 3 })
		.trim()
		.escape(),
	check("description")
		.optional()
		.trim()
		.escape(),
	check("days_of_operation")
		.optional()
		.isLength({ max: 7 })
		.trim()
		.escape()
];

rootPost.func = async (req, res) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		const D = sanitize(req.body, saniValues)
		const sql = {
			tbl,
			data: D
		}
		const { rows = [] } = await DB.doInsert(sql);
		res.status(200).json({ data: rows[0] });
	} else {
		console.log("error");
		return res.status(422).json({ errors: errors.array() });
	}
};

orgidGet.validate = [param("orgid").isInt()];

orgidGet.func = async (req, res) => {
	const { rows = [] } = await DB.query(
		`SELECT ${cols} FROM ${tbl} WHERE provider_id = '${req.params.orgid}'`
	);
	res.status(200).json({ data: rows[0] });
};

orgidPut.validate = [
	param("orgid").isInt(),
	check("provider_name")
		.optional()
		.isLength({ min: 3 })
		.trim()
		.escape(),
	check("phone")
		.optional()
		.isMobilePhone()
		.trim()
		.escape(),
	check("hours")
		.optional()
		.isLength({ min: 3 })
		.trim()
		.escape(),
	check("desc")
		.optional()
		.trim()
		.escape(),
	check("days")
		.optional()
		.isLength({ max: 7 })
		.trim()
		.escape()
];

orgidPut.func = async (req, res) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const D = sanitize(req.body, saniValues);
		const toUpdate = makeUpdates(D)
		const { rows = [] } = await DB.query(`UPDATE ${tbl} SET ${toUpdate} WHERE provider_id = ${req.params.orgid} RETURNING *`)
		res.status(200).json({ data: rows[0] })
	} else {
		console.log('error')
		return res.status(422).json({
			errors: errors.array()
		})
	}
};

// EXPORT ROUTES
module.exports = {
	rootGet,
	rootPost,
	orgidGet,
	orgidPut
};
