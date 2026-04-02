import mongoose from "mongoose"; 
  const conversationSchema = new mongoose.Schema({
    participants : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required: true ,

    } ,
],
   productId : {
     type: mongoose.Schema.Types.ObjectId,
  ref: "Product"
      
   }, 
   
        latestMessage : {
               type : mongoose.Schema.Types.ObjectId ,
                 ref : "Message"

        },
       unreadCount: {
    type: Map,
    of: Number,
    default: {},
  },  

  }
,
{timestamps : true 
        
    }
)
const Chat = mongoose.model( "Conversation", conversationSchema ) ;
export default Chat ;