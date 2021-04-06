const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const RegistrationSchema = new Schema({
    username: String,
    email: String,
    password: String,
    conpassword: String
})


RegistrationSchema.pre('save', async function(next){
	try{
		const salt = await bcrypt.genSalt(10)
		const hashedPassord = await bcrypt.hash(this.password, salt)
		this.password = hashedPassord
		next()
	}catch(error){
		next(error)
	}
})






const Registration = mongoose.model('Registration', RegistrationSchema)

module.exports = Registration
