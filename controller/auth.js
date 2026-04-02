


import User from "../model/User.js";
import { validationResult } from "express-validator";
import { signupValidator } from "../utils/validators.js";
import bcrypt from "bcryptjs" ;
import jwt from "jsonwebtoken" ;


export const signup =[
  ...signupValidator,
async(req , res , next ) => {
    const { firstname , lastname , email , password , confirmPassword , userType  } = req.body ;
    const errors = validationResult(req) ;  
    if(!errors.isEmpty()){
        return res.status(422).json({errorMessages : errors.array() }) };
  try {
      const hashedPassword = await bcrypt.hash(password , 10) ;
       const  user = new User({
        firstname , lastname , email , password : hashedPassword ,confirmPassword , userType
       });
       await user.save() ;
         res.status(201).json({ status : "success" , user}) ;
  }
  catch(err){
    res.status(500).json({message : err.message}) ;
  }
}
]
export const Login = async(req , res , next ) => {
      if (req.method === "OPTIONS") {
    return next(); 
  }
    const {email , password } = req.body ;
    if(!email || !password){
        return res.status(400).json({message : "Email and password are required"}) ;
    }
    try {
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message : "User not found"}) ;
    }

    const isPasswordValid = await bcrypt.compare(password , user.password) ;
    console.log("Password comparison result:", isPasswordValid); // Debugging line
    if(!isPasswordValid){
        return res.status(401).json({message : "Invalid password"}) ;
    }

    const token = jwt.sign({userId : user._id , userType :user.userType} , process.env.JWT_SECRET_KEY  , {expiresIn : "12h"}) ;
 // Debugging line
    res.status(200).json({token , userType : user.userType ,   user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  },  }) ;
    }catch(err){
        res.status(500).json({message : err.message}) ;
    }
}