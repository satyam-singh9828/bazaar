import express from "express" 
import { getConversation , getproductchats, postConversation, sendMessages , getNotification } from "../controller/chatcontroller.js"
import { isLoggedIn } from "../middleware/authentication.js";
const  chatrouter  = express.Router() ;
chatrouter.post("/conversation" , isLoggedIn , postConversation );
chatrouter.get("/Conversation/:id" ,isLoggedIn , getConversation);
chatrouter.post("/sendmessage" ,isLoggedIn , sendMessages);
chatrouter.get("/product/:id" , isLoggedIn , getproductchats );
chatrouter.get(
  "/notifications/:id",
  isLoggedIn,
  getNotification
);
export default chatrouter ;

