const express = require('express');
const departments = require('../models/departments');

const router = express.Router();



//Save a departments Info



router.post('/departments/save',(req,res)=>{

    let newPost = new departments(req.body);
    
    newPost.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Posts saved successfully"
        });
    });
});



//get departments Info



router.get('/departments',(req,res) =>{
    departments.find().exec((err,posts) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});



//get a specific departments Info



router.get("/departments/:id",(req,res) =>{

    let postId = req.params.id;

    departments.findById(postId,(err,post) =>{
        if(err){
            return res.status(400).json({success:false, err})
        }

        return res.status(200).json({
            success:true,
            post
        });
    });

});


//update a departments Info



router.put('/departments/update/:id',(req,res)=>{
    departments.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});



//Delete a departments Info



router.delete('/departments/delete/:id',(req,res) =>{
    departments.findByIdAndRemove(req.params.id).exec((err,deletePost) =>{

        if(err) return res.status(400).json({
            message:"Delete Unsuccesful",err
        });

        return res.json({
            message:"Delete Successful",deletePost
        });
    });
});

module.exports = router;