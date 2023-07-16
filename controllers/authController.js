const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    
    if(exisitingUser){
        return res.status(200).send({
            success: false,
            message: 'user already exist'
        })
    }

    // hash password
    const salt = await  bcrypt.genSalt(10) // here we are using 10 round to decrypt the password .. if we use more rounds then it will take more processing power to decrypt it
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPassword
    
    // rest data
    const user =   new userModel(req.body)

    await user.save()
    return  res.status(201).send({
        success: true,
        message: 'user successfully registered',
        user,
    })

  } 
  
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register API",
      error,
    });
  }
};


// now after creating register controller we will know create login controller
// login call back
const loginController = async(req,res)=>{
    try{
        const user= await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Invalid Credentials'
            })
        }

        // check role
        if(user.role!==req.body.role)
        {
            return res.status(500).send({
                success:false,
                message: "role doesnot match",
            })
        }
        // now compare password
        const comparePassword = await bcrypt.compare(req.body.password,user.password)
        if(!comparePassword){
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        // token
        // using sign method we encrypting the token
        const  token = jwt.sign({userId:user._id }, process.env.JWT_SECRET,{expiresIn: '1d'})
        return res.status(200).send({
            success:true,
            message:'login sucessfully',
            token,
            user
        })

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:' error in the API',
            error
        })
    }

};

// get current user

const currentUserController = async (req,res )=>{
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        return res.status(200).send({
          success: true,
          message: "User Fetched Successfully",
          user
        });
    }

    catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "unable to get current user",
          error
        });
    }

};

module.exports = { registerController,loginController,currentUserController };
