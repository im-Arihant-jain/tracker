const userModel = require('../models/userModel');

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({
            success: false,                         
            message: 'An error occurred during login',
            error: err.message || 'Unknown error',
        });     
    }   
};

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new userModel({ name, email, password });
        await user.save();
        console.log(user);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({
            success: false,
            message: 'An error occurred during registration',
            error: err.message || 'Unknown error',
        });
    }
};

module.exports = { loginController, registerController };
