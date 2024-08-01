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
const whitelist = ['http://localhost:5173', 'http://example2.com'];

// ✅ Enable pre-flight requests
app.options('*', cors());

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));


// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
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