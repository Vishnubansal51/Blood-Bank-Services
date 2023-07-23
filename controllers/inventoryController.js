const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// create inventory controller
const createInventoryController = async (req, res) => { 
  try {
    const { email } = req.body;
    // validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    // if(inventoryType== 'in' && user.role !== 'donar')
    // {
    //     throw new Error('donar not found');

    // }
    // if(inventoryType== 'out' && user.role !== 'hospital')
    // {
    //     throw new Error('not a hospital');

    // }
    // working with out inventory
    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      // calculating the blood quantity that is left after extraction using out
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      // calculating out blood quantity
      const totalOutOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;

      // in & out calculation
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      // validation of blood quantity
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    // save  record  agar upar wala sabh case pass ho gya toh phir hum saver karenga
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "new blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in create inventory API",
      error,
    });
  }
};

// creating get inventory controller to get all bood groups
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in getting all inventories",
      error,
    });
  }
};

// get donar records
const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    ////finding donars
    const donarId = await inventoryModel.distinct("donar", {
      organisation,
    });

    // console.log(donarId)
    //user id and donar id smae hai toh donars mein save kardo
    const donars = await userModel.find({ _id: { $in: donarId } });
    return res.status(200).send({
      success: true,
      message: "donar record fetched successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

// hospital records
const getHospitalsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    //FIND HOSPITAL
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({ 
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};

// get organisation profiles
const getOrgnaisationController = async (req, res) => {
    try {
      const donar = req.body.userId;
      const organisation = req.body.userId;
      const orgId = await inventoryModel.distinct('organisation', {donar });
      //find org

     
      const ORG = await userModel.find({
        _id: { $in: orgId },
      });
      return res.status(200).send({
        success: true,
        message: "Org Data Fetched Successfully",
        ORG,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In ORG API",
        error,
      });
    }
  };

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrgnaisationController
};
