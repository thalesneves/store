var express = require('express');
var session = require('express-session');
var path = require('path');
var database = require('./database');

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

app.get('/', function(request, response) {
	response.render('login');
});

app.post('/auth', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;

	if (username && password) {
		query = `SELECT * FROM store WHERE username = "${username}" AND password = "${password}"`;

		database.query(query, function(error, data) {
			if (error) throw error;
			if (data.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/store');
			} else {
				response.send('Usuário e/ou Senha Incorretos!');
			}
			response.end();
		});
	} else {
		response.send('Por favor entre com Usuário e Senha!');
		response.end();
	}
});

app.get('/store', function(request, response) {
	if (request.session.loggedin) {
        response.render('store');
	} else {
		response.render('login');
	}
	response.end();
});

app.get('/invernos', function(request, response) {
	if (request.session.loggedin) {
        response.render('invernos');
	} else {
		response.render('login');
	}
	response.end();
});

app.get('/todes', function(request, response) {
	if (request.session.loggedin) {
        response.render('todes');
	} else {
		response.render('login');
	}
	response.end();
});

app.get('/verones', function(request, response) {
	if (request.session.loggedin) {
        response.render('verones');
	} else {
		response.render('login');
	}
	response.end();
});

app.get('/logout', function(request, response) {
	request.session.destroy();
	response.redirect('/');
});

app.listen(3000);
console.log('Server running...')