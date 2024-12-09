import express from "express";
import { addManagement, deleteManagement, getManagement, updateManagement } from "../controllers/management.controller.js";

const managementRouter = express.Router();

managementRouter.get("/", getManagement);
managementRouter.post("/", addManagement);
managementRouter.put("/:id", updateManagement);
managementRouter.delete("/:id", deleteManagement);

export default managementRouter;