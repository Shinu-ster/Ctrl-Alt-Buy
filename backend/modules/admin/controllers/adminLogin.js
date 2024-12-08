const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminLogin = async (req,res)=>{
    const Admin = mongoose.model('admins');
    const {email,password} = req.body;
    let getAdmin;

    try {
        if(!email) throw new Error('Email is required');
        if(!password) throw new Error('Password is required');

        getAdmin = await Admin.findOne({email});

        if(!getAdmin) throw new Error("Email doesn't exists");

        const matched = await bcrypt.compare(password,getAdmin.password);
        if(!matched) throw new Error('Invalid Password');

    } catch (error) {
        return res.status(400).json({
            status:"Registration failed",
            error:error.message
        });
    }
    const accessToken = jwt.sign({
        _id:getAdmin._id,
        name:getAdmin.name,
        email:getAdmin.email,
        role:getAdmin.role
    },
    process.env.jwt_secret_key,
    {expiresIn:"30 days"}
);
    console.log('Admin Login:',req.body);
    return res.status(200).json({
        status:"Login succesful",
        accessToken
    })
    
}

module.exports = adminLogin;