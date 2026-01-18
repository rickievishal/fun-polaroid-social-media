const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");
const User = require("../models/User");
const pino = require("pino");
const { log } = require("../production-utilities/logger");


const JWT_SECRET = process.env.JWT_SECRET;
const SALT = process.env.SALT;

const createAccount = async(req,res) => {
    try{
        const {username,password,email,avatarUrl} = req.body;
        log.info("AUTH",`User request received email : ${email} username : ${username}`)
        const existingUser = await User.findOne({email});
        if(!email || !password || !username ){
            log.warn("AUTH","Required fields are not filled.")
            return res.status(400).json({message : "all fields are required"})
        }

        if(existingUser){
            log.warn("AUTH","User already exists")
            return res.status(409).json({message : "user already exists"});
        }
        const salt = "hello";
        const hashedpassword = await bcrypt.hash(password,10);
        const user = await User.create({
                username,
                password:hashedpassword,
                email,
                avatarUrl,
                role : "user"
            })
        log.info("AUTH",`User ${username} ${email} has been created`)
        return res.status(200).json({
            username,
            email,
            avatarUrl
        })
            
    }catch(err){
        console.log(err)
        res.status(404).json({message : "user data received"})
    }
}
const login = async(req,res) => {
    const {username,email,password} = req.body;
    log.info("AUTH", `User ${username} is logging in`);
    
    const user = await User.findOne({email}).select("+password");
    console.log(user);
    if(!user){
        log.error("AUTH", `Failed login attempt : User ${username}`);
        return res.status(401).json({error: "Invalid Credentials"});
    }
    
    const isMatch = await bcrypt.compare(password ,user.password);
    if(isMatch){
            const token = jwt.sign({username:user.username,email:user.email,userId : user._id},JWT_SECRET,{expiresIn:'1h'});
            return res.json({token});
        }
        else{
            return res.status(401).json({error: 'Invalid credentials'});
        }
}

const validateToken = (req,res) => {
    const token = req.header('Authorization').replace('Bearer ','');
    log.info("AUTH","Token validation request");
    if(!token){
        log.error("AUTH","Token is invalid");
        return res.status(401).json({error : "no token provided"});
    }
    try{
            const decoded = jwt.verify(token , JWT_SECRET);
            log.info("AUTH","Token validation is successfull");
            res.json({user :{ username : decoded.username , id : decoded.id} });
    }catch{
        log.error("AUTH","Token is invalid");
        res.status(401).json({error : "Invalid token"});
    }
    
}
module.exports = {login, validateToken, createAccount }