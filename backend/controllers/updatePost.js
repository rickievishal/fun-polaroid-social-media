const { Post } = require("../models/Post");

const updatePost = async(req,res) => {
    try{
        const {_id,title,imgUrl,caption} = req.body;
        const post = await Post.findByIdAndUpdate(_id,
            {
                title,
                imgUrl,
                caption
            }
        )
        const re = await Post.findById(_id);
        console.log(re)
        return res.status(200).json({message: "post has been updated"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message : "updation failed"})
    }   
}

module.exports = {updatePost}