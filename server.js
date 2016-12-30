var express = require('express');

var port = process.env.PORT || 3000;
var environment = process.env.NODE_ENV || 'development';

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.set('views', __dirname + '/server/views');

//Serve up external libraries from node_modules
app.use('/libs', express.static(__dirname + '/node_modules/'));

//deliver static content from the public directory
app.use(express.static(__dirname + '/public/'));
app.set('port', port);

//use server routing for partials so that the EJS view engine can resolve the HTML
app.get('/partials/:partialPath', function(request, response){
	response.render('partials/' + request.params.partialPath);
});

//default to index page for Angular routing
app.get('*', function(request, response) {
	response.render('index');
});
app.listen(port);
console.log('Listening on port ' + port + '...');
