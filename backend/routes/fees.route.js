import express from "express";
import { addFees, deleteFees, getFees, updateFees } from "../controllers/fees.controller.js";

const feeRouter = express.Router();

feeRouter.get("/", getFees);

feeRouter.post("/", addFees);

feeRouter.put("/:id", updateFees);

feeRouter.delete("/:id", deleteFees);

export default feeRouter;