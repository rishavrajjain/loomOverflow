const mongoose=require('mongoose');

const questionSchema=mongoose.Schema({
    title:{
        type:String
    },
    detail:{
        type:String
    },
    tags:{
        type:String
    },
    answers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'answer'
        }
    ],
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
    
})


const Question=mongoose.model('Question',questionSchema);
module.exports=Question;