const { Post } = require("../models/Post");
const { log } = require("../production-utilities/logger");

const deletePost = async(req,res) => {
    try{
        log.info("DELETE","Post is being Deleted");
        const {_id} = req.body;
        const post = await Post.findByIdAndDelete(_id);
        log.info("DELETE","Post is Deleted")
        res.status(200).json({message:"The post is deleted"});
    }catch(err){
        log.error("DELETE","Deletion Failed");
        res.status(400).json({message: "error deleting post"})
        console.log(err);
    }
}

module.exports = {deletePost}