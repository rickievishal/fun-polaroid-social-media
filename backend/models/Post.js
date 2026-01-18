const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true,
    },
    imgUrl : {
        type : String,
        default : ""
    },
    caption : {
        type : String,
        require : true,
    },
    author : {
        type : String,
        require : true
    },
    views : {
        type : Number,

    },
    likeCount : {
        type: Number,
        default: 0
    },
    viewCount : {
        type: Number,
        default: 0
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
},{timestamps : true})
const Post = mongoose.model("Post",postSchema);
module.exports = {Post}