import Management from "../models/management.model.js";
const getManagement = async (req, res) => {
    try{
        const management = await Management.find({});
        res.status(200).json({
            success: true,
            data: management
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Fetching data issue"
        })
    }
};

const addManagement = async (req, res) => {
    const management = req.body;
    if(!management.name || !management.image){
        return res.status(400).json({
            success: false,
            message: 'Fill up the required fields'
        });
    }
    const newManagement = new Management(management);
    try{
        await newManagement.save();
        res.status(201).json({
            success: true,
            message: "Management added successfully"
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Adding issue!"
        });
    }
};

const updateManagement = async (req, res) => {
    const {id} = req.params;
    const management = req.body;
    try{
        const updatedManagement = await Management.findByIdAndUpdate(id, management, {new: true});
        res.status(200).json({
            success: true,
            message: "Data updated!",
            management: updateManagement
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Update issue!"
        });
    }
};

const deleteManagement = async (req, res) => {
    const {id} = req.params;
    try{
        await Management.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Deleted successfully!"
        });
    }
    catch(err){
        res.status(404).json({
            success: false,
            message: 'Id not found'
        });
    }
};

export { addManagement, deleteManagement, getManagement, updateManagement };

