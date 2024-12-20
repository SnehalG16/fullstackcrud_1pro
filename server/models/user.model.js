const { default: mongoose, mongo } = require("mongoose");

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }

},{
    timestamps:true,
    versionKey:false
})

const Usermodel=mongoose.model("User",userSchema)
module.exports=Usermodel

