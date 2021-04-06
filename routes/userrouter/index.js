var express = require('express');
var router = express.Router();
var Productmodel = require('../../models/Productmodel');


/* GET home page. */
router.get('/', function(req, res, next) {
	Productmodel.find({}, function(err, userproduct){
  		res.render('./user/index', {title: 'MR Ecomerce Platform', userproduct:userproduct});
	})
});


router.get('/singleproductview/:id', function(req, res, next) {
 
	Productmodel.findById(req.params.id, function (err, data) {
		res.render('./user/onproduct',{data:data})
	})
});


router.get('/usaddcard', function(req, res, next) {
	
	res.render('./user/useraddcard');
});




module.exports = router;
