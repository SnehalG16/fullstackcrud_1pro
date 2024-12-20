const { default: mongoose, mongo } = require("mongoose");

const noteSchema=new mongoose.Schema({
    title:String,
    body:String,
    noteImage:{
        type:String,
        default:"https://i.pinimg.com/originals/68/79/b2/6879b237e6a87ced0a8db24c377a0554.jpg"
    },
    userid:{
       type:String,
       required:"true"
    },

},{
    timestamps:true,
    versionKey:false
})

const notemodel=mongoose.model("User",noteSchema)
module.exports=notemodel

