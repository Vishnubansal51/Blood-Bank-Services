const mongoose= require("mongoose");
const inventoryModel= require("../models/inventoryModel")
const userModel = require("../models/userModel");


// create inventory controller
const createInventoryController = async (req,res)=>{
    try{
        const {email,inventoryType} =  req.body
        // validation
        const user = await userModel.findOne({email})
        if(!user)
        {
            throw new Error('user not found');
        }
        if(inventoryType== 'in' && user.role !== 'donar')
        {
            throw new Error('donar not found');

        }
        if(inventoryType== 'out' && user.role !== 'hospital')
        {
            throw new Error('not a hospital');

        }

        // save  record  agar upar wala sabh case pass ho gya toh phir hum saver karenga
        const inventory =  new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success: true,
            message: "new blood record added"
        });

    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error in create inventory API",
            error,
          });
    }
};


// creating get inventory controller to get all bood groups
const getInventoryController =async(req,res) =>{
    try{
        const inventory = await inventoryModel.find({
            organisation: req.body.userId,
        }).populate('donar').populate('hospital').sort({createdAt: -1});
        return res.status(200).send({
            success: true,
            message:"get all records successfully",
            inventory,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: false,
            message:"error in getting all inventories", error,
        })

    }
};


module.exports = {createInventoryController
,getInventoryController};