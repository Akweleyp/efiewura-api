import express from "express";

// Create express app

const app = express();

// listening port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is Active on ${port}`);
});
