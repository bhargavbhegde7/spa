var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var api = require('./routes/api');
var user = require('./routes/user');
var travel = require('./routes/travel');
var agent = require('./routes/agent');
var manager = require('./routes/manager');
var app = express();


// view engine setup
/*app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');*/

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.use('/', routes);
app.use('/users', users);*/
//app.use('/',routes.index)

app.post('/api/login', api.login);
app.post('/signup/join', user.createUser);
app.post('/signin/check', user.authenticateUser);
app.post('/travel/newRequest', travel.newTravelRequest);
app.post('/travel/getNotifications', travel.getNotifications);
app.post('/travel/getRequest', travel.getRequest);
app.post('/agent/getNotifications', agent.getNotifications);
app.post('/agent/getRequest', agent.getRequest);
app.post('/agent/submitQuote', agent.submitQuote);
app.post('/agent/uploadRequest', agent.uploadRequest);
app.post('/manager/getNotifications', manager.getNotifications);
app.post('/manager/getRequest', manager.getRequest);
app.post('/manager/approveRequest', manager.approveRequest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.listen(3000)
module.exports = app;
