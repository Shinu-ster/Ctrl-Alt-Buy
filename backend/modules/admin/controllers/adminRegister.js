const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminRegister = async(req,res)=>{
    const Admin = mongoose.model('admins');
    const {name,email,password} = req.body;


    try {
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin) throw new Error('Email is already in use');

        const encryptedPassword = await bcrypt.hash(password,10);
        const createAdmin = await Admin.create({
            name,
            email,
            password:encryptedPassword
        });
        res.status(200).json({
            status:"Registration Successful",
            user:createAdmin._id,
        })
    } catch (error) {
        res.status(400).json({
            status:"Registration Failed",
            message:error.message
        })
        return;
    }
    console.log("Admin Registration:",req.body);
}
module.exports = adminRegister;