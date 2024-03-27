const jwt=require("jsonwebtoken")
const {CustomError}=require("./error")

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        throw new CustomError("Authorization token is missing!",401);
    }
    jwt.verify(token,process.env.JWT_SECRET,async(err,data)=>{
        if(err){
            throw new CustomError("Token is not valid!",403);
        }
        req.userId=data._id;
        // Proceed to the next middleware
        next();
    })
}

module.exports=verifyToken
