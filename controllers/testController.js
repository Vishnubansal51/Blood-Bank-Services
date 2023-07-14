const testController = (req,res)=>{
    res.status(200).send({
        message: " test welddddcome",
        success: true,
    });
};

module.exports = {testController};