const { Post } = require("../models/Post")

const getPosts = async(req,res) => {
    try{
        const limit = req.query.limit || 10;
        const cursor = req.query.cursor;
        query = cursor ? {createdAt : {$lt : new Date(cursor)}} : {};
        console.log(cursor)
        const posts = await Post.find(query)
            .sort({createdAt : -1})
            .limit(limit)
            .populate("owner","username avatarUrl")

        return res.status(200).json(posts);

        
    }catch{
        return res.status(500).json({message: "fetch failed"})
    }
}

module.exports = { getPosts }