import express from "express";
import { createProduct, getSellerProducts, deleteProduct } from "../controller/sellercontroller.js";
import { signup, Login, googleAuth } from "../controller/auth.js";
import { isLoggedIn, isSeller } from "../middleware/authentication.js";
import { upload } from "../middleware/upload.js";

const sellerRouter = express.Router();

sellerRouter.post("/products", isLoggedIn, upload.fields([
  { name: "productImage", maxCount: 1 },
  { name: "qrImage", maxCount: 1 }
]), createProduct);
sellerRouter.post("/signup", signup);
sellerRouter.post("/login", Login);
sellerRouter.post("/google-auth", googleAuth);
sellerRouter.get("/products", isLoggedIn, getSellerProducts);
sellerRouter.delete("/products/:productId", isLoggedIn, isSeller, deleteProduct);

export default sellerRouter;

