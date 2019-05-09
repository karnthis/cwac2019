const { check, param, validationResult } = require('express-validator/check')
const DB = require('../../core/db')
const { sanitize, makeUpdates } = require('../../core/funcs')

// TODO

// EXPORT
module.exports = {
	userOrgGet: {
		validate: [],
		func: userOrgGetFunc
	},
	userOrgPut: {
		validate: [],
		func: userOrgPutFunc
	},
	allOrgSumGet: {
		validate: [],
		func: allOrgSumGetFunc
	},
	allOrgFullGet: {
		validate: [],
		func: allOrgFullGetFunc
	},
	addOrgPost: {
		validate: [],
		func: addOrgPostFunc
	},
	targetOrgGet: {
		validate: [],
		func: targetOrgGetFunc
	},
	targetOrgPut: {
		validate: [],
		func: targetOrgPutFunc
	},
}
// SUMMARY
/*
userOrgGet
userOrgPut
allOrgSumGet
allOrgFullGet
addOrgPost
targetOrgGet
targetOrgPut
*/

// FUNCTIONS

function userOrgGetFunc() {

}
function userOrgPutFunc() {

}
function allOrgSumGetFunc() {

}
function allOrgFullGetFunc() {

}
function addOrgPostFunc() {

}
function targetOrgGetFunc() {

}
function targetOrgPutFunc() {

}
