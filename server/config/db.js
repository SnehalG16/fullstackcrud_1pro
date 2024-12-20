// const { default: mongoose, connections } = require("mongoose");

// const connection=mongoose.connect("mongodb://127.0.0.1:27017/fullstackdata")

// module.exports=connection
const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb://127.0.0.1:27017/FullStack_CRUD")

module.exports=connection