import Product from "../model/product.js"
import User from "../model/User.js" 
import Order from "../model/Order.js";
 export const getProducts = async(req , res  , next ) => {
   
console.log("req.userId:", req.userId);
    const userId = req.userId ;
   const user = await User.findById(userId).populate('orders');
   const products = await Product.find() ;
   res.status(200).json({products , cart : user.cart , orders : user.orders })

}
export const addtocart = async(req , res , next ) => {
    const productId = req.params.id ;
    const userId = req.userId ;

    const user = await User.findById(userId);
    user.cart.push(productId) ;
    await user.save() ;
    res.status(200).json(user.cart) ;

}
export  const removefromcart = async(req , res , next ) => {
    const productId = req.params.id ;
    const userId = req.userId ;
    const user = await User.findById(userId);
    user.cart = user.cart.filter(id => id.toString()  !== productId) ;
    await user.save() ;
        console.log(user.cart) ;
    res.status(200).json(user.cart) ;



     
}
export const createOrder = async(req , res , next ) => {
    const userId = req.userId ;
    const productId = req.params.id ;

    const product = await Product.findById(productId) ;


    const order = new Order({products :[product._id], totalAmount: product.price , customer : userId});
    await order.save() ;

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { orders: order._id },
     
      },
      { returnDocument: 'after'} // returns updated doc if needed
    );
   

    res.status(200).json(order) ;
    

    


}