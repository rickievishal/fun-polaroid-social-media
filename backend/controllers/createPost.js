const { Post } = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { log } = require("../production-utilities/logger");
const JWT_SECRET = process.env.JWT_SECRET

const createPost = async(req,res) => {
    try{
        log.info("CREATE","New post is being created");
        const {title,caption,imgUrl} = req.body;
        const user = req.user;
        const post =await Post.create({
            title,caption,imgUrl,owner: user.userId,author : user.username
        })
        log.info("CREATE","New post creation is successful");
        return res.status(200).json({message:"post created",post})
    }catch(err){
        log.error("CREATE","Post creation failed");
        console.log(err)
        return res.status(400).json({message : "post creation failed"})
    }
}

module.exports = {createPost}

// check