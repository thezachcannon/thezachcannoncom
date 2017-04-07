var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');
var githubService = require('./server/repo/github.js')
var User = require('./server/DBAccess/user/user.js');
var jwt = require('jsonwebtoken');
var port = process.env.PORT || 3000;
var environment = process.env.NODE_ENV || 'development';

//Database
var mongoose = require('mongoose');
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function () { console.log('connected') })

var app = express();
app.set('superSecret', config.secret);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.set('views', __dirname + '/server/views');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//Serve up external libraries from node_modules
app.use('/libs', express.static(__dirname + '/node_modules/'));

//deliver static content from the public directory
app.use(express.static(__dirname + '/public/'));
app.set('port', port);

//use server routing for partials so that the EJS view engine can resolve the HTML
app.get('/partials/:partialPath', function (request, response) {
  response.render('partials/' + request.params.partialPath);
});

app.get('/partials/admin/:partialPath', function (request, response) {
  response.render('partials/admin/' + request.params.partialPath);
});

//API routes
var apiRoutes = express.Router();

//Nonprotected routes
apiRoutes.get('/getGitHubInfo', function (req, res) {
  githubService.getProfileInfo().then(function (response) {
    res.send(response);
  })
})
apiRoutes.get('/getRepos', function (req, res) {
  githubService.getRepos().then(function (response) {
    res.send(response);
  });
})
apiRoutes.post('/authenticate', function (req, res) {
  console.log(req.body)
  var username = req.body.username;
  var password = req.body.password;
  var user = {};
  user.username = username;
  user.password = password;
  User.Auth(user, app).then(function (response) {
    res.send(response);
  }, function(error){
    res.json(404,error);
  })
})


apiRoutes.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
})

//User routes
apiRoutes.post('/user', function (req, res) {
  console.log(req.body);
  User.create({ username: req.body.username, password: req.body.password }).then(function (response) {
    res.json(response);
  })
})
apiRoutes.put('/user', function (req, res){
  User.updateUser(req.body).then(function(response){
    res.json(response);
  })
})
apiRoutes.get('/users', function (req, res) {
  User.getAll().then(function (response) {
    res.json(response);
  });
})
apiRoutes.get('/user/:username', function (req, res){
  User.getUser(req.params.username).then(function(response){
    res.json(response);
  })
})
apiRoutes.delete('/user/:id', function(req, res){
  console.log(req.params.id);
  User.delete(req.params.id).then(function(response){
    res.json(response);
  })
})
app.use('/api', apiRoutes);
//default to index page for Angular routing
app.get('*', function (request, response) {
  response.render('index');
});
app.listen(port);
console.log('Listening on port ' + port + '...');