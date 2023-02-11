const jwt = require('jsonwebtoken');
const secretKey =  process.env.SECRETKEY;

const authenticate = async(req,res,next)=>{
 
    // for authetication purpose

    try {
        // For getting the cookies
        const token = req.cookies.Hackathon;
        console.log(token);

        // for verify the tokken getting through cookies
        const verifyToken = jwt.verify(token,secretKey);
        console.log("Verify TOken");



        const 
        
    } catch (error) {
        
    }
}



module.exports = authenticate;