const mongoose = require('mongoose');

const Schema = mongoose.Schema


const ProductaddcardSchema = new Schema({    
    productname: String,  
    productsize: String,
    productquantity: String,
    productcolor: String,
    productprice: String,
    productlimg: String,
    totalprice: String
})

const Productaddcard = mongoose.model('Productaddcard', ProductaddcardSchema)

module.exports = Productaddcard

 