var express = require('express');
var router = express.Router();
var Productmodel = require('../../models/Productmodel');
var Productaddcard = require('../../models/Productaddcard');

var hosturl = 'http://localhost:3000';
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
	Productaddcard.find({}, function(err, data){
  		res.render('./user/useraddcard', {data:data});
	})
});

router.post('/addtocardpost', (req, res) => {
	// console.log(req.body.custId);
	Productmodel.findById(req.body.custId, function (err, data) {
		const addcard = new Productaddcard({
					productname:data.productname, 
    				productsize:data.productsize,
    				productquantity:req.body.quantity,
    				productcolor:data.productcolor,
    				productprice:data.productprice,
    				totalprice:req.body.totalprice,
    				productlimg:data.productlimg});
					addcard.save();
		res.redirect('usaddcard');
	})
}) 


router.get('/addtocarddele/:id', (req, res) => {	  
	Productaddcard.findByIdAndRemove(req.params.id, function (err, data) {		
		res.redirect(hosturl+'/usaddcard');
	})
})


module.exports = router;
