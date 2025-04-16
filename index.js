import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import listingRouter from "./router/listingroutes.js";
import userRouter from "./router/userroutes.js";
                                 



// Load environment Variables 
dotenv.config();


// Create express app

const app = express();



// database connection

 const connectToDatabase = async() =>{
  const uri = process.env.MONGO_URI

  if (!uri){
    console.error("MongoDB URI is not defined! Check your environment variables")
  }

 try {
   await mongoose.connect(process.env.MONGO_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   console.log("Database connected successfully");
 } catch (error) {
  console.error("Database connection failed:", error);
  process.exit(1)}
};

// Connect to the database 
connectToDatabase();

// Use middlewares
app.use(express.json());
app.use(cors());

//  Use Routers
app.use(listingRouter);
app.use(userRouter);


// listening port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is Active on ${port}`);
});
