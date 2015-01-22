var mongoose = require('mongoose');
var userSchema = new mongoose.Schema ({
	username : String,
	password : String,
	role : String
});
mongoose.connect('mongodb://localhost:27017/test');

var uData = mongoose.model('userData', userSchema);

exports.createUser = function (req, res) {	
	var data = new uData ({
		username : req.body.username,
		password : req.body.password,
		role : 'Hacker'
	});
	data.save(function (err, data) {
		if (err) {
			console.log('Error : '+err)
		}
		res.send('done')
		console.dir(data);
	});
};

exports.authenticateUser = function (req, res) {
	var queryData = req.body.username;
	uData.findOne({'username':queryData}, function (err, data) {
		if (err) {
			console.log('Error : ',err)
		}
		res.send('done');
	});
};
