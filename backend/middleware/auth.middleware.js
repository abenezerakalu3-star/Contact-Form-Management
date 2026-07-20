import jwt from "jsonwebtoken"


const authMiddleware = (req,res,next) => {
    const {token} = req.cookies
    if(!token){
        return  res.status(401).json({ success: false, message: "Unauthorized ,please login" });
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decode.id
    } catch (error) {
        next(error)
    }
}

export default authMiddleware