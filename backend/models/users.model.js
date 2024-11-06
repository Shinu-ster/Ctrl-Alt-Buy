const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"]
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
    phoneNo: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); 
            },
            message: props => `${props.value} is not a valid phone number! It should contain exactly 10 digits.`
        }
    }

    
},{
    truestamp:true
})
const userModel = mongoose.model('users',userSchema);
module.exports = userModel;