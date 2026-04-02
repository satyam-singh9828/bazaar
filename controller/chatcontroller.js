import Chat from "../model/chatmodel.js" 
import Message from "../model/messagemodel.js";
import mongoose from "mongoose";

export const postConversation = async(req , res) => {
  try {
    const { sellerId, productId } = req.body;
    console.log(sellerId);
    console.log(productId);

    const buyerId = req.userId;

    // check if chat already exists
    let chat = await Chat.findOne({ 
      participants: { $all: [buyerId, sellerId] },
      productId: productId,
    });

    // if not → create new chat
    if (!chat) {
      chat = await Chat.create({
        participants: [buyerId, sellerId],
        productId: productId,
      });
    }
 
    res.status(200).json(chat);
    

  } catch (err) {
       
    res.status(500).json({ error: err.message });
  }   
}
export const getConversation = async (req, res) => {
  try {
    
   const messages = await Message.find({
     chat : req.params.id,
   }).populate("buyer" , "firstname email")
   
     
   

    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const sendMessages = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    // ✅ 1. Create message
    const message = await Message.create({
      buyer: req.userId,
      content: text,
      chat: conversationId,
    });

    // ✅ 2. Populate message
    const fullMessage = await Message.findById(message._id)
      .populate("buyer", "firstname email");

    // ✅ 3. GET CHAT (🔥 IMPORTANT)
    const chat = await Chat.findById(conversationId);

    // ✅ 4. FIND RECEIVER (🔥 IMPORTANT)
    const senderId = req.userId;

    const receiverId = chat.participants.find(
      (id) => id.toString() !== senderId.toString()
    );

    // ✅ 5. UPDATE UNREAD COUNT (🔥 MAIN LOGIC)
    chat.unreadCount.set(
      receiverId.toString(),
      (chat.unreadCount.get(receiverId.toString()) || 0) + 1
    );

    // ✅ 6. UPDATE latest message
    chat.latestMessage = message._id;

    await chat.save();

    // ✅ 7. SEND RESPONSE
    res.status(201).json(fullMessage);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getproductchats = async(req , res ) => {
  try {
    console.log(req.params.id);
    const chats = await Chat.find({
      productId : req.params.id ,

    })  .populate("participants", "firstname email")
      .populate({
        path: "latestMessage",
        populate: {
          path: "buyer",
          select: "firstname",
        },
      })
      .sort({ updatedAt: -1 });
   res.status(200).json(chats);
  }catch(err){
    res.status(500).json({error: err.message});
  }
}
export const getNotification = async(req , res ) => {
  try {
    const id = req.params.id ;
     const chats = await Chat.find({
      participants: id // 🔥 seller ke chats
    })  
    .populate("participants", "firstname email")
      .populate({
        path: "latestMessage",
        populate: {
          path: "buyer", // ya sender (jo use kar raha)
          select: "firstname email",
        },
      })
      .sort({ updatedAt: -1 });
  
   
  const notifications = chats.filter(
      (chat) =>
        chat.unreadCount?.get(req.userId.toString()) > 0
    );

  res.status(200).json(notifications);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }

}