var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = (function() {
	return {
		show: function(req, res) {
			Customer.find({}, function(err, results) {
				if(err) {
					res.json(err);
				} else {
					res.json(results);
				}
		   })
		},
		add: function(req, res) {
			if(req.body.date < (req.body.created_at+'T07:00:00.000Z')){
				res.json({message: 'You cannot add a date in the past'});
			}
			else if(req.body.date < (req.body.dayAdvance+'T07:00:00.000Z')){
				res.json({message: 'You cannot make an appoint within 24 hours'});
			}
			else{
				var customer = new Customer(req.body);
				Customer.find({date:req.body.date}, function(err, results) {
					if(err || results.length<3){
						Customer.find({date:req.body.date, name:req.body.name}, function(err, results) {
							if(results<1){
								customer.save(function(err) {
									if(err) {
										res.json(err);
									}
									else {
										res.json({message:'Successfully added a customer'});
									}
								})
							}
							else {
								res.json({message:'You Already have an appointment that day'});
							}
						})
					} else {
						res.json({message:"The doctor is already booked for that day."})
					}
				})
			}
		},
		remove: function(req, res) {
			console.log(req.params);
			Customer.remove({_id:req.params.id}, function(err, results) {
				if(err){
					res.json(err);
				} else {
					res.json(results);
				}
			})
		}
	}
})();