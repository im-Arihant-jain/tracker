const express = require("express");
const {loginController} = require('../controllers/userControllers');
const { registerController } = require("../controllers/userControllers");
const router = express.Router();
router.post('/login',loginController)
router.post('/register',registerController)
module.exports = router;
