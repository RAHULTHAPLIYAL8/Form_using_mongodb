const mongoose = require('mongoose');

const BookSchema=new mongoose.Schema(
{
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:
    {
        type:String,
        required:true,     
    },
    author:
    {
        type:String,
        required:true,   
    },
    condition:
    {
        type:String,
        enum:['New','Fair','Old'],
        default:'Good'
    },
    imageUrl:
    {
        type:String,

    },
    isAvailable:{
        type:Boolean,
        default:true,
    }
}
)


module.exports = mongoose.model('Book', BookSchema);
