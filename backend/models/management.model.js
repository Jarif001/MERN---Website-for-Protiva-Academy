import mongoose from "mongoose";

const managementSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    institute:{
        type: String,
    },
    image: {
        type: String,
        require: true
    },
    rank: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const Management = mongoose.model('Manager', managementSchema);
export default Management;