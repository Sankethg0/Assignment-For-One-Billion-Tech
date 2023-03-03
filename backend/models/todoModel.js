const mongoose = require('mongoose')
const {objectId} = mongoose.Schema.Types;

const todoSchema = new mongoose.Schema({
    text:{
        type:String,
        required: true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model('ToDo',todoSchema)