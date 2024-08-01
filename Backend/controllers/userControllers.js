const userModel = require('../models/userModel');
const { ObjectId } = require('mongodb'); // Import ObjectId
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
const reviewregister = async (req,res) => {
    try {
        const { review, userid, logname } = req.body;
        const userIdObject = new ObjectId(userid); // Convert to ObjectId

        // console.log(typeof(userIdObject)); // Check the type, should be 'object'

        const user = await userModel.findOne({ _id: userIdObject }); // Use ObjectId in the query
        console.log(user)
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        user.reviews.push({
          review,
          reviewerName: logname
        });
    
        // Save the updated user document
        await user.save();
    
        res.status(200).json({ message: 'Review added successfully', user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
}
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

module.exports = { loginController, registerController, reviewregister };
