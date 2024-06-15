const express = require("express");
const {getTransactions, editTransactions, deleteTransactions} = require('../controllers/userTransactions');
const { addTransactions } = require("../controllers/userTransactions");
const router = express.Router();
router.post('/add-transaction',addTransactions)
router.post('/edit-transaction',editTransactions)
router.post('/delete-transaction',deleteTransactions)
router.post('/get-transaction',getTransactions)
module.exports = router;

// tera naa rha  jab se


