import express from 'express';
import {getProducts , addtocart , removefromcart , createOrder} from "../controller/customerController.js"
import { isLoggedIn } from '../middleware/authentication.js';

const customerRouter = express.Router() ;
customerRouter.get("/products",isLoggedIn , getProducts);
customerRouter.post("/cart/:id" ,isLoggedIn ,  addtocart);
customerRouter.delete("/cart/:id" , isLoggedIn , removefromcart  );
customerRouter.post("/order" ,isLoggedIn, createOrder);
customerRouter.post("/order/:id" ,isLoggedIn, createOrder);
export default customerRouter 

                                                     


