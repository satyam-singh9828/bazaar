import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import sellerRouter from './router/sellerRouter.js' ;
import customerRouter from './router/customerRouter.js' ;
import chatrouter from './router/chatrouter.js' ; 
import path from 'path';
import http from "http";
import session from "express-session";
import passport from "passport";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "./model/User.js";


import { isLoggedIn, isSeller , isBuyer} from './middleware/authentication.js';

import setupPassport from "./config/passport.js";
const app = express() ;
const FRONTEND_URL = "https://apnabazzarr.netlify.app" || "http://localhost:5173";

const server = http.createServer(app);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
setupPassport();
const allowedOrigins = [
  "http://localhost:5173",
  "https://apnabazzarr.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://apnabazzarr.netlify.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});
io.on("connection" , (socket) => {
    console.log("User connected" , socket.id);
  socket.on("setup" , (userData) => {
    console.log("user joined room : ", userData);
    socket.join(userData);
    socket.emit("connected");


  })
  socket.on("joinChat" , (conversationId) => {
    socket.join(conversationId);
    
  })
  socket.on("sendMessage", (message) => {
    const chatId = message.chat ;
    console.log( "chat joied by " , chatId);
    if(!chatId){
       return ;
    }
    socket.to(chatId).emit("MessageReceived", message);
  })
})
app.use(express.json()) ;
app.use(bodyParser.urlencoded({ extended: true })) ;
app.use(cors()) ;
app.use('/api/seller' , sellerRouter) ;
app.use('/api/customer'   , customerRouter);
app.use('/api/chat' , chatrouter ) ;
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads'))) ;

// 🔹 Login route
app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// 🔹 Callback route
app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${FRONTEND_URL}/login`
  }),
  async (req, res) => {
    try {
      const { googleId, firstname, email } = req.user;
      const existingUser = await User.findOne({
        $or: [{ email }, { googleId }],
      });

      if (existingUser) {
        if (googleId && existingUser.googleId !== googleId) {
          existingUser.googleId = googleId;
          await existingUser.save();
        }

        const token = jwt.sign(
          { userId: existingUser._id, userType: existingUser.userType },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "12h" }
        );

        const query = new URLSearchParams({
          token,
          userType: existingUser.userType,
          user: JSON.stringify({
            _id: existingUser._id.toString(),
            firstname: existingUser.firstname,
            lastname: existingUser.lastname,
            email: existingUser.email,
          }),
        });

        return res.redirect(`${FRONTEND_URL}/auth/success?${query.toString()}`);
      }

      const query = new URLSearchParams({
        email,
        firstname,
        googleId,
      });

      return res.redirect(`${FRONTEND_URL}/auth/success?${query.toString()}`);
    } catch (error) {
      return res.redirect(`${FRONTEND_URL}/login`);
    }
  }
);
const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@product.gbmwwiy.mongodb.net/?appName=${process.env.MONGO_DB_DATABASE}` ;
mongoose.connect(MONGO_DB_URL).then(() => {
    server.listen(3000 , () => {
        console.log(`Server + Socket running on http://localhost:3000`);
    });
});
