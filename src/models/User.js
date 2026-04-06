const mongoose = require("mongoose");

const userScheme= new mongoose.Schema(
  {
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true
    },
    HashedPassword:{
      type:String,
      required:true
    }
  },
  {
    timestamps:true
  }
);

const User=mongoose.model("User",userScheme);
module.exports={User};