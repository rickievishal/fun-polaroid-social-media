require("dotenv").config();
require("./controllers/dbController")
const cors = require('cors');
const express = require("express");
const {login,validateToken, createAccount} = require("./controllers/authcontrollers");
const { createPost } = require("./controllers/createPost");
const { log } = require("./production-utilities/logger");
const { protect } = require("./middleware/authMiddleware");
const { getPosts } = require("./controllers/getPosts");
const app = express();

app.use(cors({
    origin:'*',
    credentials :false
}))
app.get('/',(req,res)=> {
    res.send("hello from the server");
})
app.use(express.json());
app.get("/api/validate",validateToken)

app.post("/api/login",login);

app.post("/api/create-account",createAccount)
app.get("/api/get-posts",protect,getPosts)
app.post("/api/create-post",protect,createPost)
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    log.info("SERVER","Server has started")
})