

const userModel = require('../models/userModel');
const groupModel = require('../models/groupModel') ;
const transactionModel = require('../models/transactionModel');


const createGroups = async (req, res) => {
    try {
        const { name, user_id } = req.body;
        if (!name || !user_id) {
            return res.status(400).json({ success: false, message: 'Name and user ID are required.' });
        }
 
        let group = new groupModel({ name });

        // Find user and transactions
        let transactions = await transactionModel.find({ userid: user_id });
        let user = await userModel.findById(user_id);

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found.' });
        }

        // Add transactions and user to the group
        group.transactions.push(...transactions.map(transaction => transaction._id));
        group.members.push(user._id);

        // Save the group
        await group.save();

        console.log(group);
        res.status(200).json({
            success: true,
            group,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
}
const getgroup = async (req,res)=>{
    try{
    const groupdata =await  groupModel.find().populate('transactions');
    res.status(200).json({groupdata});
    }catch(err){
        console.log(err);       
        res.status(500).send(err)
    }
}   // tamatatar 
const getgroupdata = async (req,res) =>{
    try{
        const {name} = req.body;
      const result =   await groupModel.find({name})
      console.log(result);
      console.log('hiii');
      res.status(200).json({result});
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}                                                                 
module.exports = { createGroups ,getgroup,getgroupdata };                                      