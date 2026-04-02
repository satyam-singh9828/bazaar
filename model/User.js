import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname : {
    type : String ,
    required : true ,

  },
  lastname : {
    type : String ,
    required : true ,

  },


   email : {
         type: String  ,
            required : true ,

   },
   password : {
    type : String ,
    required : true
   },
   confirmPassword : {
    type : String ,
    required : true
   },
   userType : { type : String ,
    required : true ,
    enum : ["buyer" , "seller"]

     
   },
   cart : [{    
    type : mongoose.Schema.Types.ObjectId ,
    ref : "Product" ,
    default : []
   }],
   orders : [{type : mongoose.Schema.Types.ObjectId , ref : "Order" , default : []}]

}) 
const User = mongoose.model("User" , UserSchema) ;

export default User ;