import express from "express";
import { addMember, getMembers, editMember, deleteMember } from "../controller/member.controller.js";

const router = express.Router();

// Add a member
router.post("/add", addMember);

// Get all members
router.get("/", getMembers);

// Edit a member
router.put("/edit/:id", editMember);

// Delete a member
router.delete("/delete/:id", deleteMember);

export default router;
