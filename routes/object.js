var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
var ObjectItem = require('../api/object');
var url = require('url');

router.post('/', function(req, res, next) {
		if (req.body) {
			var object = {
				key: req.body.key,
				value: req.body.value
			}
			var data = new ObjectItem(object);
			data.save();
			res.status(200).send({ status: 'success insert' });
		} 

});

/* GET users listing. */
router.get('/:key', function(req, res, next) {
	var url_parts = url.parse(req.url, true);
	if (Object.keys(url_parts.query).length !== 0) { // with query
		var query = url_parts.query;

		var timeStart = Number(query.timestamp) * 1000; // convert to ms
		var timeEnd = (Number(query.timestamp)+60) * 1000; // add 1 more min

		ObjectItem.find({
			"key":req.params.key,
			"createTime":{"$gte":new Date(timeStart),"$lt":new Date(timeEnd)}
		}, function(err, obj){
			if (err) {
				res.status(400).send({ 'Error': err });
			}
	  		if (obj[0]) {
	  			var sendObj = [];
	  			for (var i=0; i<obj.length; i++) {
	  				var item = { 'value': obj[i].value}
	  				sendObj.push(item);
	  			}
	  			res.status(200).send(sendObj);
	  		} else {
	  			res.status(400).send({'response': 'no such key'});
	  		}

		})
	} else {
		ObjectItem.findOne({"key":req.params.key})
			.sort('-createTime')
			.exec(function(err, obj){
				if (err) {
					res.status(400).send({ 'Error': err });
				}
		  		if (obj.key) {
		  			res.status(200).send({'value': obj.value});
		  		} else {
		  			res.status(400).send({'response': 'no such key'});
		  		}

			})
	}
		
});

module.exports = router;