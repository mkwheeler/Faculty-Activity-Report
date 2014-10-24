'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var validateLocalStrategyCourses = function(property) {
	return property <= 2014 && property >= 1900;
};

var Membership = new Schema({
	// add more arrays when you find out what else there can be
	examples: [{
		title: {
			type: String,
			required: true
		},
		year: {
			type: Number,
			required: true,
			validate: [validateLocalStrategyCourses, 
			'Year must not be after current year or before 1900']
		}
	}],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}

}, {collection:'Membership'});

mongoose.model('Membership', Membership);