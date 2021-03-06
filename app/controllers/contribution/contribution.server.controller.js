'use strict';

var mongoose = require('mongoose');
var Contribution = mongoose.model('Contribution');

var errorHandler = require('../errors');
var is = require('is-js');
var _ = require('lodash');

var u = require('underscore');
/*
Gets the data from the frontend and
saves it in the database.
*/

exports.create = function(req, res) {
	if (is.empty(req.body.contribution)) {
		return res.jsonp({
			err: 'Post (create): Does not exist',
			message: 'req.body.contribution did not get sent to backend',
			changes: 'No Contribution Created'
		});
	}

	var contribution = new Contribution({
		info: req.body.contribution.info,

		user: req.user,
		report: req.report
	});

	contribution.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contribution);
		}
	});
};

exports.update = function(req, res) {
	//console.log(require('util').inspect(req.body));
	
	if (is.empty(req.body.contribution)) {
		res.status(400);
		return res.jsonp({
			err: 'Put (update): Does not exist',
			message: 'req.body.contribution did not get send to backend',
			changes: 'No Changes Made'
		});
	}

	var contribution = req.contribution;

	contribution = _.extend(contribution, req.body.contribution);

	contribution.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(contribution);
		}
	});
};

exports.readFromReport = function(req, res) {
	Contribution.findOne({report: req.report})
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, result) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		return res.jsonp(result);
	});
};

exports.read = function(req, res) {
	res.jsonp(req.contribution);
};

exports.contributionById = function(req, res, next, id) {
	Contribution.findById(id)
	.populate('user', 'displayName')
	.populate('report', 'reportName')
	.exec(function(err, contribution) {
		if (err) return next(err);
		if (!contribution) return next(new Error('Failed to load Contribution ' + id));
		req.contribution = contribution;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.contribution.user.id !== req.user.id && !u.contains(req.user.roles, 'admin')) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};