import Product from "../model/product.js";
import mongoose from "mongoose" ;
export const createProduct = async(req , res , next ) => {
    const { name , description ,  price  } = req.body ;
   

    if(!req.files || !req.files.productImage || !req.files.qrImage){
        return res.status(400).json({message : "image is required"});

    }
try {
    const product = new Product({
        name , description , price , imageUrl : req.files.productImage[0].path, qrCodeUrl : req.files.qrImage[0].path,  sellerId: new mongoose.Types.ObjectId(req.userId)
    });
    await product.save() ;
    res.status(201).json({ status : "success" , product});
}catch(err){
    res.status(500).json({message : err.message }) ;

}

};
export const getSellerProducts = async(req , res , next ) => {
    try{
        const products = await Product.find({sellerId : req.userId}) ;
        res.status(200).json({status : "success" , products}) ;
    }
    catch(err){
        res.status(500).json({message : err.message}) ;
    }
}
export const deleteProduct = async(req , res , next ) => {
    const {productId} = req.params ;
    try {
        const product = await Product.findOne({_id : productId , sellerId : req.userId}) ;
        if(!product){
            return res.status(404).json({message : "Product not found "});

        }
        await product.deleteOne() ;
        res.status(200).json({status : "success" , message : "Product deleted successfully "}) ;
    }catch(err ){
        res.status(500).json({message : err.message}) ;
    }
    }
    




