import express from "express";
import { addTeacher, deleteTeacher, getTeachers, updateTeacher } from "../controllers/teachers.controller.js";

const teacherRouter = express.Router();

teacherRouter.get("/", getTeachers);

teacherRouter.post("/", addTeacher);

teacherRouter.put("/:id", updateTeacher);

teacherRouter.delete("/:id", deleteTeacher);

export default teacherRouter;