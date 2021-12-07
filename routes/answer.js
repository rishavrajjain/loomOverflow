const express = require('express');
const auth = require('../middleware/auth');
const Answer = require('../models/answer');
const router = express.Router();



router.post('/answer/add/:id',auth,async(req,res)=>{
    try{
        const answer = new Answer(req.body);
        answer.question = req.params.id;
        answer.author = req.user._id;
        await answer.save();
        res.status(200).json({
            data:answer
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

router.post('answer/edit/:id',auth,async(req,res)=>{
    try{
        const answer = await Answer.findOne({_id:req.params.id});
        if(!answer){
            res.status(404).json({
                message:'Answer not found'
            })
        }

        if(answer.author !== req.user._id){
            res.status(401).json({
                message:'Unauthorised, you cannot edit the answer'
            })
        }

        answer.content = req.body.content;
        await answer.save();
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

router.delete('/answer/delete/:id',auth,async(req,res)=>{
    try{
        const answer= await Answer.findOne({_id:req.params.id});
        if(!answer){
            res.status(404).json({
                message:'Answer not found'
            })
        }

        if(answer.author !== req.user._id){
            res.status(401).json({
                message:'Unauthorised, you cannot delete the answer'
            })
        }

        await Answer.findByIdAndDelete({_id:req.params.id});
        res.status(200).json({
            message:'Answer deleted successfully'
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Something went wrong ! :('
        })
    }
})

router.post('/answer/like/:id',auth,async(req,res)=>{
    try{
        const answer = await Answer.findOne({_id:req.params.id});
        answer.like = answer.like+1;
        await answer.save();
        res.status(200).json({
            message:'Answer liked successfully'
        })
    }catch(err){
        if(answer.author !== req.user._id){
            res.status(401).json({
                message:'Unauthorised, you cannot edit the answer'
            })
        }
    }
})

module.exports=router;