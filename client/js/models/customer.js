app.factory('CustomerFactory', function($http) {
	var factory = {};
	var appointments = [];

	factory.getAppointments = function(callback) {
		$http.get('/appointments').success(function(output) {
			appointments = output;
			appointments.sort().reverse();
			callback(appointments);
		})
	}

	factory.addAppointment = function(info, callback) {
		$http.post('/appointments', info).success(function(data){
			console.log(data);
			callback(data);
		});
	}

	factory.removeAppointment = function(id, callback) {
		$http.delete('/appointments/'+id).success(function(data){
			callback(data);
		});
	}
	factory.newName = function(info, callback) {
		$http.post('/newName', info).success(function(data) {
			// console.log(data);
			callback(data);
		})
	}

	return factory;
})