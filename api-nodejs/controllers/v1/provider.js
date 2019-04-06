const { check, param, validationResult } = require("express-validator/check");
const DB = require("../../core/db");
const { makeDateStamp, makeOptionals } = require("../../core/funcs");

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

const rootGet = {};
const rootPost = {};
const orgidGet = {};
const orgidPut = {};

rootGet.func = async (req, res) => {
	const { rows } = await DB.query(`SELECT ${cols} FROM ${tbl}`);
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
	//*	NOT REQUIRED
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

rootPost.func = async (req, res) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		console.log("pass");
		const { provider_name, phone, hours, desc, days } = req.body;
		const sql = {
			tbl,
			data: {
				provider_name,
				phone,
				hours,
				description: desc || null,
				days_of_operation: days || null,
				last_verified: makeDateStamp()
			}
		};
		const { rows } = await DB.doInsert(sql);
		res.status(200).json({ rows: rows[0] });
		// res.status(200).json({ rows: 'hit' })
	} else {
		console.log("error");
		return res.status(422).json({ errors: errors.array() });
	}
};

orgidGet.validate = [param("orgid").isInt()];

orgidGet.func = async (req, res) => {
	const { rows } = await DB.query(
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
	//TODO: Moar
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		const { provider_name, phone, hours, desc, days } = req.body;
		const toUpdate = makeOptionals([
			['str', 'provider_name', provider_name],
			['str', 'phone', phone],
			['str', 'hours', hours],
			['str', 'desc', desc],
			['str', 'days', days],
		])
		const { rows } = await DB.query(`UPDATE ${tbl} SET ${toUpdate} WHERE provider_id = ${req.params.orgid} RETURNING *`)
		res.status(200).json({
			data: rows[0]
		})
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
