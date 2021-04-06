var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var session = require('express-session');
var multer  = require('multer');



var Registration = require('../../models/Registration');
var Catagorymodel = require('../../models/Catagorymodel');
var Productmodel = require('../../models/Productmodel');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200  
}
 
var storage = multer.diskStorage({
  destination: './public/productimage',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg')
  }
})

var upload = multer({storage:storage}).fields([
		{name: 'productsimg'},
		{name: 'productmimg'},
		{name: 'productlimg'}
	])


/* GET home page. */

var hosturl = 'http://localhost:3000';

router.get('/', (req, res) => {
	res.render('./admin/adminlogin');
}) 


router.get('/dashhome', (req, res) => {
	if(!req.session.username){   		
  		res.redirect('/Adminst');
	}else{
		const data = [
		{title:"01", description:"sdfasdfasdfasdf"},
		{title:"02", description:"sdfasdfasdfasdf"},
		{title:"03", description:"sdfasdfasdfasdf"},
		{title:"04", description:"sdfasdfasdfasdf"},
		{title:"05", description:"sdfasdfasdfasdf"},
		{title:"06", description:"sdfasdfasdfasdf"},
		{title:"07", description:"sdfasdfasdfasdf"},
		{title:"08", description:"sdfasdfasdfasdf"},
		{title:"09", description:"sdfasdfasdfasdf"},
		{title:"10", description:"sdfasdfasdfasdf"},
		{title:"13", description:"sdfasdfasdfasdf"},
		{title:"14", description:"sdfasdfasdfasdf"},
		{title:"15", description:"sdfasdfasdfasdf"},
		{title:"16", description:"sdfasdfasdfasdf"},
		{title:"17", description:"sdfasdfasdfasdf"}
		]
  		res.render('./admin/dashboard', {data:data});
	}
})

router.post('/adminauth', (req, res) => {
	const username  = req.body.username;
	const password  = req.body.password;	
	Registration.findOne({username})
		.then(user => {
			if(user){
				bcrypt.compare(password, user.password, function(err, result) {					
					console.log(result);
      				 if(result){
      					req.session.username = username;
      					// req.session.password = password;
						res.redirect('dashhome');						
      				 }else{						      				 
						res.redirect('/Adminst');
      				 }
				});
				}else{					
				res.redirect('/Adminst');
			}
		}) 
})

router.get('/logout',(req,res)=>{	
  req.session.destroy(function (err) {
  	if(!err){  		
    	res.redirect('/Adminst');
  	}
   });
})


router.get('/getcatagory', (req, res) => {	

	Catagorymodel.find({}, function(err, user){		
		res.render('./admin/catagorypage',{user:user});		
	})
})



router.post('/postcatagory', (req, res) => {
	 	d = new Date();
		const catagorytime = d.toLocaleString();	

	const catagor = new Catagorymodel({
					catagoryname:req.body.catagoryname,
					catagorytime:catagorytime });
					catagor.save();
	 res.redirect('getcatagory');
}) 


router.get('/catagorydel/:id', (req, res) => {	  
	Catagorymodel.findByIdAndRemove(req.params.id, function (err, data) {		
		res.redirect(hosturl+'/Adminst/getcatagory');
	})
})


router.get('/product', (req, res) => {
	Catagorymodel.find({}, function(err, user){		
		Productmodel.find({}, function(err, prodct){		
			res.render('./admin/productpage',{user:user, prodct:prodct});		
		})
	})
})
 

router.post('/postproduct',(req, res) => {

	upload(req, res, function(err){
		if(err){
			console.log(err)
		}else{						
			// console.log(req.files.productsimg[0].filename);
			d = new Date();
			const producttime = d.toLocaleString();
			// var productsimg = `http://localhost:3000/productimg/${req.files.productsimg[0].filename}`;
			// var productmimg = `http://localhost:3000/productimg/${req.files.productsimg[0].filename}`;
			// var productlimg = `http://localhost:3000/productimg/${req.files.productlimg[0].filename}`;

			const productmod = new Productmodel({				
					catagorytype: req.body.catagorytype, 
					productname: req.body.productname,
					productdescription: req.body.productdescription,
					stockquantity: req.body.stockquantity,
					productsize: req.body.productsize,
					productcolor: req.body.productcolor,
					productprice: req.body.productprice,
					productsimg: req.files.productsimg[0].filename,
					productmimg: req.files.productmimg[0].filename,
					productlimg: req.files.productlimg[0].filename,
					productshow: req.body.productshow,
					createdate: producttime,
					updatedate: producttime});
				productmod.save();
		}
	 	res.redirect('product');
	}) 
}) 





router.get('/getcheckout', (req, res) => {
	res.render('./admin/checkoutpage');
}) 




 
module.exports = router;
