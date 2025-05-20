const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
    },
    fullname:{
        type:String,
        required: true,
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    phone:{
        type:Number,
        required: true,
    },
    password:{
        type:String,
        select:false,
        required: [true, "password is required"],
        minLength:[6,"password must be at least 6 characters"],
        maxLength:[16,"password must be at most 6 characters"]
    },
    avtar:{
        type:Object,
        default:{
            fileId:"",
            url:"https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"
        }
    },
},{timestamps:true})

User.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)
})

User.methods.comparePassword = function(password){
    console.log(this.password);
    return bcrypt.compareSync(password,this.password)
}

User.methods.getjwttoken = function(){
    return jwt.sign({id:this._id},process.env.USERJWT_SECRET)
}
module.exports = mongoose.model('User',User)