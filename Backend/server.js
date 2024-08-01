const express = require("express");
const stripe = require('stripe');
const cors = require("cors");
const userroutes = require('./routes/userRoutes')
const transactionroutes = require('./routes/transaction')
const groupsdata = require('./routes/groups')
const morgan = require("morgan");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const colors = require("colors");
const app = express();
//middlewares
require('dotenv').config();
app.use(morgan("dev"));
app.use(express.json());
// arey bhai mai kabhi kabaar bhul jaata hu phone krnaa usme kya and hence its alw
app.use(cors());
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
  main();
  app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userroutes);
app.use("/api/v1/transaction", transactionroutes);
app.use("/api/v1/group", groupsdata);
 // deep jala ke diwalii mai manayungii 
//routes and hence its always 
const PORT = 8080|| process.env.PORT;
app.listen(PORT,()=>{
    console.log("server is ruuning")
})