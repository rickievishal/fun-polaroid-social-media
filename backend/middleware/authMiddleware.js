const jwt = require("jsonwebtoken");
const { log } = require("../production-utilities/logger");
const JWT_SECRET = process.env.JWT_SECRET;


const protect  = (req,res,next) => {

    log.info("MIDDLEWARE","User validity check");
    // const token = req.header("Authorization").replace('Bearer ','');
    const token = req.cookies.token;
    if(!token){
        log.error("MIDDLEWARE","Token not provided");
        return res.status(400).json({message: "token is not provided"});
    }
    try{
        const decoded = jwt.decode(token,JWT_SECRET);
        log.info("MIDDLEWARE","Middleware check passed");
        req.user = decoded;
        next();
    }catch{
        log.error("MIDDLEWARE","Middleware check passed");
        return res.status(400).json({message: "Token is invalid"});
    }
}

module.exports = { protect }
