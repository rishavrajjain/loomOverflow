const express = require('express');
const auth = require('../middleware/auth');
const Answer = require('../models/answer');
const Question = require('../models/questions');


const router = express.Router();



router.post('/question/ask',auth,async(req,res)=>{
    try{
        const question = new Question(req.body);
        question.author = req.user._id;
        await question.save();
        res.status(200).json({
            data:question
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

router.post('/question/edit/:id',auth,async(req,res)=>{
    try{
        const question = await Question.findOne({_id:req.params.id});
        if(!question){
            res.status(404).json({
                message:'Question not found'
            })
        }
        console.log(question.author);
        console.log(req.user._id)
        if(question.author.toString() !== req.user._id.toString()){
            console.log(true)
            res.status(401).json({
                message:'Unauthorised, you cannot edit this question'
            })
        }

        question.tags = req.body.tags;
        question.title = req.body.title;
        question.detail = req.body.detail;

        await question.save();
        res.status(200).json({
            data:question
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    } 
})

router.delete('/question/delete/:id',auth,async(req,res)=>{
    try{
        const question = await Question.findOne({_id:req.params.id});
        if(!question){
            res.status(404).json({
                message:'Question not found'
            })
        }

        if(question.author.toString() !== req.user._id.toString()){
            res.status(401).json({
                message:'Unauthorised, you cannot delete this question'
            })
        }

        await Question.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({
            message:'Question deleted successfully'
        })


        
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

router.get('/question/:id',async(req,res)=>{
    try{
        const question = await Question.findOne({_id:req.params.id});
        const answers = await Answer.find({question:req.params.id}).populate('author','email')
        question.views = question.views +1;
        question.save();
        res.status(200).json({
            data:question,
            answers:answers
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

router.post('/question/like/:id',async(req,res)=>{
    try{
        const question = await Question.findOne({_id:req.params.id});
        question.like = question.like+1;
        await question.save();
        res.status(200).json({
            message:'Question liked successfully'
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

router.get('/questions',async(req,res)=>{
    try{
        const questions = await Question.find({});
        res.status(200).json({
            data:questions
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

router.get('/mostLikedQuestions',async(req,res)=>{
    try{
        const questions = await Question.find({}).sort({likes:-1});
        res.status(200).json({
            data:questions
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

router.get('/mostViewedQuestions',async(req,res)=>{
    try{
        const questions = await Question.find({}).sort({views:-1});
        res.status(200).json({
            data:questions
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

router.get('/questions/search/:text',async(req,res)=>{
    try{
        const text = req.params.text;
        let regex = new RegExp(text, 'i');
        const questions = await Question.find({ $or: [{ title: regex }, { detail: regex },{tags:regex}]});
        res.status(200).json({
            data:questions
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

router.get('/questions/my',auth,async(req,res)=>{
    try{
        const questions = await Question.find({author:req.user._id});
        res.status(200).json({
            data:questions
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

module.exports=router;