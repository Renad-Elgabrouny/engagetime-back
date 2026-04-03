import mongoose from "mongoose";

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

export const User=mongoose.model("User",userScheme);