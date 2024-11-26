const express = require('express');
const projects = require('../models/projects');

const router = express.Router();


//Save a projects Info



router.post('/projects/save',(req,res)=>{

    let newPost = new projects(req.body);
    
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


//get projects Info


router.get('/projects',(req,res) =>{
    projects.find().exec((err,posts) =>{
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



//get a specific projects Info



router.get("/projects/:id",(req,res) =>{

    let postId = req.params.id;

    projects.findById(postId,(err,post) =>{
        if(err){
            return res.status(400).json({success:false, err})
        }

        return res.status(200).json({
            success:true,
            post
        });
    });

});



//update a projects Info



router.put('/projects/update/:id',(req,res)=>{
    projects.findByIdAndUpdate(
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



//Delete a projects Info



router.delete('/projects/delete/:id',(req,res) =>{
    projects.findByIdAndRemove(req.params.id).exec((err,deletePost) =>{

        if(err) return res.status(400).json({
            message:"Delete Unsuccesful",err
        });

        return res.json({
            message:"Delete Successful",deletePost
        });
    });
});

module.exports = router;