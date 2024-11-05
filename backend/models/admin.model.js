const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    role:{
        type:String,
        default:"admin"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;