const mongoose = require('mongoose');

const Schema = mongoose.Schema


const ProductmodelSchema = new Schema({
    catagorytype: String,
    productname: String,
    productdescription: String,
    stockquantity: String,
    productsize: String,
    productcolor: String,
    productprice: String,
    productsimg: String,
    productmimg: String,
    productlimg: String,
    productshow: String,
    createdate: String,
    updatedate: String
})

const Productmodel = mongoose.model('Productmodel', ProductmodelSchema)

module.exports = Productmodel

