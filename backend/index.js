require("dotenv").config();
require("./controllers/dbController")
const cors = require('cors');
const express = require("express");
const {login,validateToken, createAccount} = require("./controllers/authcontrollers");
const { createPost } = require("./controllers/createPost");
const { log } = require("./production-utilities/logger");
const { protect } = require("./middleware/authMiddleware");
const { getPosts } = require("./controllers/getPosts");
const { ownerProtect } = require("./middleware/ownershipMiddleware");
const { updatePost } = require("./controllers/updatePost");
const { deletePost } = require("./controllers/deletePost");
const cookieParser = require("cookie-parser");
const { logout } = require("./controllers/logoutUser");
const app = express();

app.use(cors({
    origin:'http://192.168.3.1:3000',
    credentials :true
}))

app.get('/',(req,res)=> {
    res.send("hello from the server");
})
app.use(cookieParser());
app.use(express.json({limit : "5mb"}));
app.get("/api/validate",validateToken)
app.get("/api/get-posts",protect,getPosts)

app.post("/api/login",login);
app.post("/api/create-account",createAccount)
app.get("/api/logout",logout)

app.post("/api/create-post",protect,createPost)
app.post("/api/update-post",protect,ownerProtect,updatePost)
app.post("/api/delete-post",protect,ownerProtect,deletePost)
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    log.info("SERVER","Server has started")
})