const { log } = require("../production-utilities/logger");

const ownerProtect = (req,res,next) => {
    const userId = req.user.userId;
    const postOwnerId = req.body.owner;
    log.info("MIDDLEWARE","Ownership is being checked")
    
    if(postOwnerId === userId){
        next();
    }else{
        log.error("MIDDLEWARE","Ownership is not valid")
        return res.status(400).json({message : "the ownership verification failed"});
    }
}

module.exports = {ownerProtect}