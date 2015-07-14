var app = angular.module('app', ['ngRoute', 'angularMoment']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: "partials/customers.html"
	})
	.when('/customers', {
		templateUrl: 'partials/customers.html'
	})
	.when('/new_appointment', {
		templateUrl: 'partials/new_appointment.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});