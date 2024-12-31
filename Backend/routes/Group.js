import express from "express";
import { addGroup, getGroups, editGroup, deleteGroup } from "../controller/group.controller.js";

const router = express.Router();

// Add a group
router.post("/add", addGroup);

// Get all groups
router.get("/", getGroups);

// Edit a group
router.put("/edit/:id", editGroup);

// Delete a group
router.delete("/delete/:id", deleteGroup);

export default router;
