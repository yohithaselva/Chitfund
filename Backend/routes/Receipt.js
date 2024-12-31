import express from "express";
import { addReciept, getReciepts, editReciept, deleteReciept } from "../controller/reciept.controller.js";

const router = express.Router();

// Add a reciept
router.post("/add", addReciept);

// Get all reciepts
router.get("/", getReciepts);

// Edit a reciept
router.put("/edit/:id", editReciept);

// Delete a reciept
router.delete("/delete/:id", deleteReciept);

export default router;
