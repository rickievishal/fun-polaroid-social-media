const { Post } = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const createPost = async(req,res) => {
    try{
        const {title,caption,imgUrl} = req.body;
        console.log(req.user);
        const user = req.user;
        const post =await Post.create({
            title,caption,imgUrl,owner: user.userId,author : user.username
        })
        
        return res.status(200).json({message:"post created",post})
    }catch(err){
        console.log(err)
        return res.status(400).json({message : "post creation failed"})
    }
}

module.exports = {createPost}

// check