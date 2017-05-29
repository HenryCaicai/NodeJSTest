var should = require('should');
var app = require('../app');
var request = require('supertest');

describe('object sanitize', function() {
	// Post testing
	it('should return true when key and value are both string type', function(done) {
		request(app)
      	.post('/object')
      	.send({"mykey":"value1"})
      	.expect(200)
      	.expect('Content-Type', /json/)
      	.end(function(err, res) {
       		if (err) done(err);
        	res.body.should.have.property('status');
        	done();
      	});
	});

	it('should return true when key is a string and value is an object', function(done) {
		request(app)
      	.post('/object')
      	.send({"mykey":{"subvalue":"value1"}})
      	.expect(200)
      	.expect('Content-Type', /json/)
      	.end(function(err, res) {
       		if (err) done(err);
        	res.body.should.have.property('status');
        	done();
      	});
	});

	it('should return false when request don\'t has body', function(done) {
		request(app)
      	.post('/object')
      	.send({})
      	.expect(400)
      	.expect('Content-Type', /json/)
      	.end(function(err, res) {
       		if (err) done(err);
        	res.body.should.have.property('Error');
        	done();
      	});
	});

	// Get testing
	it('should return ture when query is "mykey"', function(done) {
		request(app)
      	.get('/object/mykey')
      	.expect(200)
      	.expect('Content-Type', /json/)
      	.end(function(err, res) {
	        if (err) {return done(err);}
	        res.body.value.subvalue.should.be.equal("value1");
	        done();
      });
	});

	it('should return false when query is "mykey1"', function(done) {
		request(app)
      	.get('/object/mykey1')
      	.expect(400)
      	.expect('Content-Type', /json/)
      	.end(function(err, res) {
	        if (err) {return done(err);}
	        res.body.should.have.property('Error');
	        done();
      });
	});
})