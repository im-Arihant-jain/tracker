const mongoose=require('mongoose')

const transectionSchema = new mongoose.Schema({
    userid :{
        type:String,
        required: [true, 'amount is required']
    },
    type:{
        type:String,
        required: [true, 'amount is required']
    },
    amount: {
        type: Number,
    required: [true, 'amount is required']
    },
    category:{
        type: String,
        required: [true,'cat is required']
    },
    reference:{
        type:String,   
    },
    description:{
        type:String,
        required: [true,'desc is required']
    },
    reviews:[{
        type:String
    }],
    date:{
        type:Date,
        required: [true,'date is required']
    }},{timestamps: true},  
)
const transactionModel = mongoose.model("transactionModel",transectionSchema);
module.exports = transactionModel;