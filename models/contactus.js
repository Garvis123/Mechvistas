const mongoose = require('mongoose');

const contact = mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
             'Please fill a valid email address'
            ]
    },
    phone:{
        type:Number,
        required: true,
    },
    message:{
        type:String,
        required: [true, "message is required"],
        maxLength:[200,"message must be at most 6 characters"]
    },
    firstname:{
        type:String,
        required: [true, "firstname is required"],
        maxLength:[16,"firstname must be at most 6 characters"]
    },
    lastname:{
        type:String,
        required: [true, "lastname is required"],
        maxLength:[16,"lastname must be at most 6 characters"]
    },

},{timestamps:true})

module.exports = mongoose.model('Contact',contact)