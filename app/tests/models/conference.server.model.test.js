'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	assert = require('assert'),
	Conferences = mongoose.model('Conferences');

var con1;
	
describe('Conferences Model Unit Tests:', function() {
	beforeEach(function(done) {
		con1 = new Conferences({
			/*
			title: 'Hall of the Mountain King',
			area: 'State',
			presentation: 'Speech',
			where: 'Jaxonville, FL',
			date: 'January 2000'
			*/
		});
				
		done();
	});

	describe('Method Save', function() {
		
		it('should be able to save without problems if no info given', function(done) {
			con1.save();
			done();
		});
		it('should set info to N/A if nothing given', function(done) {
			assert.equal(con1.info, 'N/A');
			done();
		});
		it('should be able to save without problems if info is given', function(done) {
			con1.info = 'lol conferences';
			con1.save();
			done();
		});
		/*
		it('should fail to save without title', function(done) {
			con1.title = '';
			return con1.save(function(err) {
				should.exist(err);
				done();
			});
		});
	
		it('should fail to save without area', function(done) {
			con1.area = '';
			return con1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save with invalid area', function(done) {
			con1.area = 'Over the Rainbow';
			return con1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('Should fail to save without presentation', function(done) {
			con1.presentation = '';
			return con1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('Should fail to save with invalid presentation', function(done) {
			con1.presentation = 'Macaroni Art';
			return con1.save(function(err) {
				should.exist(err);
				done();
			});			
		});
		
		it('should fail to save without where', function(done) {
			con1.where = '';
			return con1.save(function(err) {
				should.exist(err);
				done();
			});			
		});
		
		it('should fail to save without date', function(done) {
			con1.date = '';
			return con1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		
		it('should fail to save with an invalid date', function(done) {
			con1.date = 'yunno, that one day. It rained.';
			return con1.save(function(err) {
				should.exist(err);
				done();
			});
		});
		*/
	
	});
	afterEach(function(done) {
        Conferences.remove().exec();
        done();
    });
});
