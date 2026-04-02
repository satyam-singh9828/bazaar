import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    products : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Product" ,
        required : true , 
    }] , 
    totalAmount : {
        type : Number ,
        required : true ,
    },
    createdAt : {
        type : Date ,
        default : Date.now ,
    },
    customer: {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true }
}) ;
const Order = mongoose.model("Order" , OrderSchema) ;
export default Order ;