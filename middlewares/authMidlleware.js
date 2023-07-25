const JWT = require('jsonwebtoken');


module.exports = async (req,res,next) =>{
    // jabh tak next call nhi hoga .. hmare kuch nhi call hona wala tabhI usko middleware kehta hain
    try{
        const token = req.headers["authorization"].split(" ")[1];
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success: false,
                    message:'Auth Failed ho gya'
                })
            }
            
            else
            {
                req.body.userId= decode.userId;
                next();
            }
        })
    }
    catch(error){
        console.log(error);
        return res.status(401).send({
            success: false,
            error,
            message:'Auth Failed'
        })

    }
}