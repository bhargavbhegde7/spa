
exports.login = function(req, res) {
	var us = new mon.Schema({ username: 'string', password: 'string',role: 'string' });
	var spa = mon.model('spa',us);
	console.log(req.body.username);
	console.log(req.body.password);
	spa.findOne({ username: req.body.username},'role', function (err, result) {
          console.log(result);
          if (err) {
            res.json({
                authenticated: false,
                role: null
            });
        }
        res.json({
            authenticated: true,
            role: result
        });
    });
}