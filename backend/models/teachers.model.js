import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    institute:{
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;