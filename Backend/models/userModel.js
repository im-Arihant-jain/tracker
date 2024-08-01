const mongoose=require('mongoose')
//schema design
const userSchema= new mongoose.Schema({
name: {
    type: String,
required: [true, 'name is required']
},


email:{
    type:String,
required: [true, 'email is required and should be unique'], 
},
reviews: [{
    review: String,
    reviewerName: String
  }],
password: {
    type:String,
required:[true, 'password is required']
}
},{timestamps: true},
)
const userModel = mongoose.model("userModel",userSchema);
module.exports = userModel;