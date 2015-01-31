var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    userid: String,
    username: String,
    password: String,
    email: String,
    role: String
});
mongoose.connect('mongodb://localhost:27017/test');

var userData = mongoose.model('userData', userSchema, 'userData');

exports.uData = userData;
exports.createUser = function(req, res) {
    var data = new userData({
        userid: new Date().getTime(),
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    });
    data.save(function(err, data) {
        if (err) {
            console.log('Error : ' + err)
        }
        res.json(data);
        console.dir(data);
    });
};

exports.authenticateUser = function(req, res) {
    var queryData = req.body.username;
    var qpwd = req.body.password;
    userData.findOne({
        'username': queryData,
        'password': qpwd
    }, function(err, data) {
        if (err) {
            cosnole.log('error')
            res.json({
                'error': 'Not Found'
            });
        } else {
            if (data === null) {
                res.json({
                    'error': 'Not Found'
                });
            } else {
                res.json(data);
            }
        }
    });
};
