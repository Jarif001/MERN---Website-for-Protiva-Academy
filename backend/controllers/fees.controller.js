import Fees from "../models/fees.model.js";
const getFees = async (req, res) => {
    try{
        const fees = await Fees.find({});
        fees.sort((a,b) => a.sortId - b.sortId);
        res.status(200).json({
            success: true,
            data: fees
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Fetching data issue!"
        });
    }
};

const addFees = async (req, res) => {
    const fees = req.body;
    if(!fees.type || fees.fee == null || fees.sortId == null){
        return res.status(400).json({
            success: false,
            message: "Please fill up all the fields"
        });
    }
    const newFee = new Fees(fees);
    try{
        await newFee.save();
        res.status(201).json({
            success: true,
            message: "Fees added successfully"
        });
    }
    catch(err){
        console.log('Error in adding Fees!');
        res.status(500).json({
            success: false,
            message: "Adding issue!"
        });
    }
};

const updateFees = async (req, res) => {
    const {id} = req.params;
    const fees = req.body;
    try{
        const updatedFees = await Fees.findByIdAndUpdate(id, fees, {new: true});
        res.status(200).json({
            success: true,
            message: "Data updated",
            fees: updatedFees
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Updating issue!"
        });
    }
};

const deleteFees = async (req, res) => {
    const {id} = req.params;
    try{
        await Fees.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Fees is deleted successfully'
        });
    }
    catch(err){
        res.status(404).json({
            success: false,
            message: "Delete issue!"
        });
    }
};

export { addFees, deleteFees, getFees, updateFees };

