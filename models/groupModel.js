const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Group schema
const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'userModel',
    }],
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'transactionModel',     // EK HAMARE RISHABH PANT EK HAMARE RISHABH PANT AND HENCE ITS ALWAYS GOOD TO MAKE IT COUNT KABILIYAT DIKHANA 
    }]      
});

// Middleware to update the updatedAt field on save
 
// Create and export the Group model
const groupModel = mongoose.model('groupModel', GroupSchema);
module.exports = groupModel;
