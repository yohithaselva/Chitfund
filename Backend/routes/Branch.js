import express from "express";
import { addBranch, editBranch, deleteBranch, searchBranches, getBranchById, getAllBranches } from "../controller/branch.controller.js";

const router = express.Router();

// Route to add a branch
router.post('/add', addBranch);

// Route to edit a branch
router.put("/edit/:id", editBranch);

// Route to delete a branch
router.delete("/delete/:id", deleteBranch);

// Route to search for branches by branch ID or name
router.get("/search", searchBranches);

// Route to get a branch by ID
router.get("/:id", getBranchById);

// Route to get all branches
router.get("/", getAllBranches);

export default router;
