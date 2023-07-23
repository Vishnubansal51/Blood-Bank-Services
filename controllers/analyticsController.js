const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel")

// get blood data
const bloodGroupDetailsController = async (req,res)=>{
    try{
        const all_blood_groups =  ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"]
        const curr_blood_group_data =[]
        const organisation = new mongoose.Types.ObjectId(req.body.userId);
        
        // get single blood group ... i am using map to map all blood groups
        // using async for map bec data is dynamic.. woh change hota reha ga
        // single bloodGroup daal ra hoon
        await Promise.all(all_blood_groups.map(async (SingleBloodGroup)=>{
            // count total blood in
            const BloodIn= await inventoryModel.aggregate([
                {
                    $match: {
                    bloodGroup:SingleBloodGroup,
                    inventoryType: 'in',
                    organisation,
                },
            },

                {
                    $group:{
                        _id:null,
                        total: {$sum: '$quantity'}

                    }

                }


            ])
            // count total blood out
            const BloodOut= await inventoryModel.aggregate([
                {$match: {
                    bloodGroup:SingleBloodGroup,
                    inventoryType: 'out',
                    organisation
                }
            },

                {
                    $group:{
                        _id:null,
                        total: {$sum: '$quantity'}

                    }

                }

            ])
            // calculaten total blood left
            const  BloodLeft = (BloodIn[0]?.total || 0 ) - (BloodOut[0]?.total || 0 ) 

            //adding data in my curr blood data
            curr_blood_group_data.push({
                SingleBloodGroup,
                BloodIn:BloodIn[0]?.total || 0,
                BloodOut:BloodOut[0]?.total || 0,
                BloodLeft
            })

        }))
        return res.status(200).send({
            success: 'true',
            message: "blood group data fetched successfully",
            curr_blood_group_data

        })

    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success: 'false',
            message: "error in creating blood group data by bloodgroupdetail api ",
            error
        })
    }
}





module.exports= {bloodGroupDetailsController};