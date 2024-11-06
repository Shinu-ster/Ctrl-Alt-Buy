const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userRegister = async(req,res)=>{
    const User = mongoose.model('users');
    const {username,email,password,phoneNo} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            throw new Error('Email is already in use');
        }
        const encryptedPassword = await bcrypt.hash(password,10);

        const createUser = await User.create({
            username,
            email,
            password:encryptedPassword,
            phoneNo
        });

        res.status(200).json({
            status:"Registration Successful",
            user:createUser._id,
        })
    } catch (error) {
        res.status(400).json({
            status:"Registration Failed",
            message:error.message
        });
        return;
    }
    console.log("User Registered:",req.body);
}
module.exports = userRegister;