const userModel = require("../models/userModel");


// get donar list
const get_donar_list_controller = async (req, res) => {
  try {
    const donar_data = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
      return res.status(200).send({
        success: 'true',
        TotalCount: donar_data.length,
        message: 'donar data fetched successfully',
        donar_data
      })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: "false",
      message: "error in creating donar list api",
      error,
    });
  }
};
// get hospital list
const get_hospital_list_controller = async (req, res) => {
  try {
    const hospital_data = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
      return res.status(200).send({
        success: 'true',
        TotalCount: hospital_data.length,
        message: 'hospital data fetched successfully',
        hospital_data
      })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: "false",
      message: "error in creating hospital list api",
      error,
    });
  }
};
// get organisation list
const get_org_list_controller = async (req, res) => {
  try {
    const org_data = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });
      return res.status(200).send({
        success: 'true',
        TotalCount: org_data.length,
        message: 'organisation data fetched successfully',
        org_data
      })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: "false",
      message: "error in creating organisation list api",
      error,
    });
  }
};

// delete  for deleleting donar
const delete_donar_controller = async (req,res) =>{
  try{
    await userModel.findByIdAndDelete(req.params.id)

    return res.status(200).send({
      success: 'true',
      message: 'donar data deleted successfully',
  
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).send({
      success: "false",
      message: "error while deleting donar api",
      error,
    });
  }
}
// delete  for deleleting hospital
const delete_hospital_controller = async (req,res) =>{
  try{
    await userModel.findByIdAndDelete(req.params.id)

    return res.status(200).send({
      success: 'true',
      message: 'hospital data deleted successfully',
  
    })
  }
  catch (error) {
    console.log(error);
    return res.status(500).send({
      success: "false",
      message: "error while deleting hospital api",
      error,
    });
  }
}

module.exports = { get_donar_list_controller, get_hospital_list_controller,get_org_list_controller,delete_donar_controller,delete_hospital_controller };
