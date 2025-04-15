import express from "express";
import cors from "cors";
import listingRouter from "./router/listingroutes.js";
import userRouter from './router/userroutes.js'
                                 
import mongoose from "mongoose";



// database connection

await mongoose.connect(process.env.MONGO_URI);


// Create express app

const app = express();

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
