# NodeJSTest

A simple node js project connect with mongodb using simple Get and Post requirement. 

## Code Example

This project uses some libs below with following code examples:

1. 'express' on get/post request handler.
  ```
  if (req.body && Object.keys(req.body).length !== 0) {
    console.log(JSON.stringify(req.body));
    for (var inputKey in req.body) {
      var object = {
        key: inputKey,
        value: req.body[inputKey]
      }
      var data = new ObjectItem(object);
      data.save();
    }
    res.status(200).send({ status: 'success insert' });
  } else {
    res.status(400).send({ 'Error': 'request incompleted or type error' });
  }

});
```
2. 'mongoose' on connect to MongoDB.
```
var ObjectItemSchema = new mongoose.Schema({
    key: String,
    value: Object,
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime'},
    collection: 'object'
});
```
3. 'mocha', 'should' and 'supertest' for testing.
```
it('should return true when key and value are both string type', function(done) {
		request(app)
      	.post('/object')
      	.send({
      		"key":"mykey",
      		"value":"value1"
      	})
      	.expect(200)
      	.expect('Content-Type', /json/)
      	.end(function(err, res) {
       		if (err) done(err);
        	res.body.should.have.property('status');
        	done();
      	});
	});
```

## Installation On Mac

1. Open the Terminal app and type ```brew install node```.
2. Run ```node -v``` and ```npm -v``` to make sure that whether 'node' and 'npm' are installed.
3. Install [MongoDB](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) and turn it on.
4. Clone the project to local.
5. In Terminal, go to project directory, type ```npm install```, to install libs.
6. Run ```node bin/www``` to turn on the web server.
7. Test the project with get/post request on ```localhost:3000/object``` using some API testing apps like [Postman|Apps](https://www.getpostman.com/apps).

## Tests

1. For local testing, open Terminal, go to project directory andy run ```mocha test/object.spec.js```. You will see the out put below in terminal: 
```

  object sanitize
{"mykey":"value1"}
POST /object 200 34.941 ms - 27
    ✓ should return true when key and value are both string type (89ms)
{"mykey":{"subvalue":"value1"}}
POST /object 200 4.148 ms - 27
    ✓ should return true when key is a string and value is an object
POST /object 400 1.171 ms - 45
    ✓ should return false when request don't has body
GET /object/mykey 200 20.837 ms - 73
    ✓ should return ture when query is "mykey"
GET /object/mykey1 400 2.789 ms - 23
    ✓ should return false when query is "mykey1"


  5 passing (176ms)
```
It means everything goes well.

2. For public testing, you need to go to [url](http://3d914b49.ngrok.io/)/object/ with get & post functions using some API testing apps like [Postman|Apps](https://www.getpostman.com/apps).
