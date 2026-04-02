import mongoose from "mongoose";
const messagemodel = mongoose.Schema( {
    buyer : {
           type : mongoose.Schema.Types.ObjectId ,
                         ref : "User"

    },
    content : {
        type : String ,
        trim : true ,

    },
    chat : {
         type : mongoose.Schema.Types.ObjectId ,
                         ref : "Conversation"

    },
 
})
const Message = mongoose.model( "Message" , messagemodel );
export default Message ;
