app.controller('CustomersController', function(CustomerFactory, $location, $rootScope) {
	while(!$rootScope.name) {
		$rootScope.name = prompt("What's Your Name?");
	}
	// this becomes that so that we have access to it in the functions
	var that = this;
	that.message;
	// Grabs customer list when controller is called
	CustomerFactory.getAppointments(function(data) {
		that.appointments = data;
	});
	if($rootScope.name){
		that.name=$rootScope.name;
		var datenow = new Date();
		dd = datenow.getDate();
		dd1 = dd+1;
		if(dd<10){
			dd = '0'+dd;
		}
		mm = datenow.getMonth()+1;
		if(mm<10) {
			mm = '0'+mm;
		}
		yr = datenow.getFullYear();
		that.datenow = yr+'-'+mm+"-"+dd+'T07:00:00.000Z';
	}

	// $location.path('/users'); THIS IS HOW YOU REDIRECT TO OTHER PARTIALS

	that.addappointment = function() {
		// Resest error caused by adding the same customer to the database
		if(that.new_appointment){
			that.new_appointment.created_at = new Date();
			dd = that.new_appointment.created_at.getDate();
			dd1 = dd+1
			if(dd<10){
				dd = '0'+dd;
			}
			if(dd1<10) {
				dd1 = '0'+dd1;
			}
			mm = that.new_appointment.created_at.getMonth()+1;
			if(mm<10) {
				mm = '0'+mm;
			}
			yr = that.new_appointment.created_at.getFullYear()
			that.new_appointment.created_at = yr+'-'+mm+"-"+dd;
			that.new_appointment.dayAdvance = yr+'-'+mm+"-"+dd1;
			console.log(that.new_appointment.created_at);
			that.new_appointment.name = $rootScope.name;
		}
		console.log(that.new_appointment);
		CustomerFactory.addAppointment(that.new_appointment, function(data) {
			CustomerFactory.getAppointments(function(data2) {
				that.appointments = data2;
			});
			// Should be eiter Error of Success Message
			that.message = data.message
			that.new_appointment = {};
		});

	}

	that.removeappointment = function(id) {
		// Data is success or error message
		CustomerFactory.removeAppointment(id, function(data) {
			// Grabs updated list of appointments
			CustomerFactory.getAppointments(function(data2) {
				that.appointments = data2;
			});
			that.message = data.message
			that.new_customer = {};
		});
	}
});