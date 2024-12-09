import Teacher from "../models/teachers.model.js";
const getTeachers = async (req, res) => {
    try{
        const teachers = await Teacher.find({});
        res.status(200).json({
            success: true,
            data: teachers
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

const addTeacher = async (req, res) => {
    const teacher = req.body;
    if(!teacher.name || !teacher.institute || !teacher.subject || !teacher.image){
        return res.status(400).json({
            success: false,
            message: "Please fill up all the fields"
        });
    }
    const newTeacher = new Teacher(teacher);
    try{
        await newTeacher.save();
        res.status(201).json({
            success: true,
            message: "Teacher added successfully"
        });
    }
    catch(err){
        console.log('Error in adding teacher!');
        res.status(500).json({
            success: false,
            message: "Adding issue!"
        });
    }
};

const updateTeacher = async (req, res) => {
    const {id} = req.params;
    const teacher = req.body;
    try{
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, teacher, {new: true});
        res.status(200).json({
            success: true,
            message: "Data updated",
            teacher: updatedTeacher
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Updating issue!"
        });
    }
};

const deleteTeacher = async (req, res) => {
    const {id} = req.params;
    try{
        await Teacher.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Teacher is deleted successfully'
        });
    }
    catch(err){
        res.status(404).json({
            success: false,
            message: "Delete issue!"
        });
    }
};

export { addTeacher, deleteTeacher, getTeachers, updateTeacher };

