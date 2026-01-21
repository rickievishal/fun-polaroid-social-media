const  mongoose  = require("mongoose");

const UserSchema = new mongoose.Schema({
    
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        index : true 
    },
    avatarUrl : {
        type : String,
        require : true
    },
    password : {
        type : String,
        select: false,
        require : true
    },
    role : {
        type : String,
        enum : ["user","root"],
        require : true
    }
},{timestamps : true})
const User = new mongoose.model("User",UserSchema);

module.exports = User;