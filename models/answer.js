const mongoose=require('mongoose');

const answerSchema=mongoose.Schema({
    content:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'question'
    }
    
})


const Answer=mongoose.model('Answer',answerSchema);
module.exports=Answer;