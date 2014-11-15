'use strict';

var mongoose = require('mongoose');
var Governance = mongoose.model('Governance');

var modelClass = require('../modelClass');
var renderModel = new modelClass.RenderModel( Governance, 'governance/governance.tex', 'governance/na.tex');

var is = require('is-js');

var defaultData = require('../default.json');
var _ = require('underscore');

/*
will explicitly populate the report with
the data you provide
*/
renderModel.setDebugPopulate( false, {
	govStr: 'Debug String'
});

/*
will explicitly print the N/A latex
to the screen for debugging purposes
*/
renderModel.isDebugNull = false;

/*
render function that finds the obj in the database
and converts it into latex.
*/
module.exports.render = function(req, callback) {
	renderModel.render(req, callback);
};

/*
Gets the data from the frontend and
saves it in the database.
*/
module.exports.submit = function(req, callback) {
	if (is.empty(req.body.governance)) return callback(null, null);

	var gov = new Governance({
		govStr: req.body.governance.govStr,
		user: req.user
	});

	gov.save(function(err) {
		callback(err, gov);
	});
};

module.exports.createDefaultData = function(report, user, cb) {
	var save = _.extend(defaultData.governance, {
		report: report,
		user: user
	});

	var governance = new Governance(save);

	governance.save(function(err) {
		cb(err, governance);
	});
};

