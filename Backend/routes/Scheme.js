import express from "express";
import { addScheme, getSchemes, editScheme, deleteScheme } from "../controller/scheme.controller.js";

const router = express.Router();

// Add a scheme
router.post("/add", addScheme);

// Get all schemes
router.get("/", getSchemes);

// Edit a scheme
router.put("/edit/:id", editScheme);

// Delete a scheme
router.delete("/delete/:id", deleteScheme);

export default router;
