var appointments = require('./../server/controllers/customers.js');
var express = require('express');

var session = require('express-session');

var app = express();

app.use(session({secret: "codingdojorocks"}));

module.exports = function(app) {
	app.get('/appointments', function(req, res) {
		appointments.show(req, res);
	});
	app.post('/appointments', function(req, res) {
		console.log(req.session.name);
		appointments.add(req, res);
	});
	app.delete('/appointments/:id', function(req, res) {
		appointments.remove(req, res);
	});
	app.post('/newName', function(req, res) {
		req.session.name = req.body.name;
		console.log(req.session.name);
	})
};
