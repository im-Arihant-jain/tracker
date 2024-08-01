const transactionModel = require('../models/transactionModel');
const moment = require('moment');
const editTransactions = async (req,res) =>{
    try{
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload);
        res.status(200).send('edit-successfull');
    }catch(error){
        console.error('Error during getting all transactions:', err);
        res.status(500).json({
            success: false,
            message: 'An error occurred during getting all transactions',
            error: err.message || 'Unknown error',
        });
    }
}
const deleteTransactions = async (req,res) =>{
    try{

        await transactionModel.findOneAndDelete({_id:req.body.transactionId});
        res.status(200).send('delete-successfull');
    }catch(error){
        console.error('Error during getting all transactions:', err);
        res.status(500).json({
            success: false,
            message: 'An error occurred during getting all transactions',
            error: err.message || 'Unknown error',
        });
    }
}
const getTransactions = async (req, res) => {
    try {
        const { type, frequency } = req.body;
        console.log('Type:', frequency); 
        let query = {
            date: {
                $gt: moment().subtract(Number(frequency), 'd').toDate()
            },
            userid: req.body.userid
        };

        // Conditionally add the type filter if it's not 'all'
        if (type !== 'all') {
            query.type = type;
        }

        const user = await transactionModel.find(query);
        res.status(200).json(user);
    } catch (err) {
        console.error('Error during getting all transactions:', err);
        res.status(500).json({
            success: false,
            message: 'An error occurred during getting all transactions',
            error: err.message || 'Unknown error',
        });
    }
};


const addTransactions = async (req, res) => {
    try {
        // yhi the yhi rhenge raam hai baaki sab kisse jhute sachaa hai raghunanadan kaa naam yeh dharti yogi santon ki yaha pe raaj krenge raam
        const user = new transactionModel(req.body);
        await user.save();
        console.log(user);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {  
        console.error('Error during adding transactions:', err);
        res.status(500).json({
            success: false,     
            message: 'An error occurred during adding transactions',
            error: err.message || 'Unknown error',
        });
    }
};

module.exports = { getTransactions, addTransactions,editTransactions ,deleteTransactions };
