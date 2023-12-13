const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{type:String,require: [true, "Please enter name"]},
    email:{type:String,require: [true, "Please enter email"]},
    number:{type:Number,require: [true, "Please enter mobile no."]},
    password:{type:String,require: [true, "Please enter password"]},
    location:{type:String,require: [true, "Please write your address"]},
    date:{type: Date,default:Date.now},
})

const User=mongoose.model("user",UserSchema);

module.exports=User;