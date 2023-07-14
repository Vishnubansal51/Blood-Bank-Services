const userModel = require("../models/userModel");

const bcrypt = require("bcryptjs");

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

module.exports = { registerController };
