import Branch from "../models/branch.js";

// Add a new branch
export const addBranch = async (req, res) => {
    try {
        const { branch_id, bname, parent_id, start_date } = req.body;

        // Check if branch already exists
        const existingBranch = await Branch.findOne({ branch_id });
        if (existingBranch) {
            return res.status(400).json({ message: "Branch ID already exists" });
        }

        const newBranch = new Branch({ branch_id, bname, parent_id, start_date });
        await newBranch.save();

        res.status(201).json({ message: "Branch added successfully", branch: newBranch });
    } catch (error) {
        res.status(500).json({ message: "Error adding branch", error });
    }
};

// Edit an existing branch
export const editBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedBranch = await Branch.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        res.status(200).json({ message: "Branch updated successfully", branch: updatedBranch });
    } catch (error) {
        res.status(500).json({ message: "Error updating branch", error });
    }
};

// Delete a branch
export const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBranch = await Branch.findByIdAndDelete(id);
        if (!deletedBranch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        res.status(200).json({ message: "Branch deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting branch", error });
    }
};

// Search branches by branch_id or bname
export const searchBranches = async (req, res) => {
    try {
        const { query } = req.query; // Search query from request

        if (!query) {
            return res.status(400).json({ message: "Query parameter is required" });
        }

        const branches = await Branch.find({
            $or: [
                { branch_id: { $regex: query, $options: "i" } },
                { bname: { $regex: query, $options: "i" } }
            ]
        });

        if (branches.length === 0) {
            return res.status(404).json({ message: "No branches found" });
        }

        res.status(200).json({ message: "Branches found", branches });
    } catch (error) {
        res.status(500).json({ message: "Error searching branches", error });
    }
};

// Get a branch by its ID
export const getBranchById = async (req, res) => {
    try {
        const { id } = req.params; // Branch ID from params

        const branch = await Branch.findById(id);
        if (!branch) {
            return res.status(404).json({ message: "Branch not found" });
        }

        res.status(200).json({ message: "Branch found", branch });
    } catch (error) {
        res.status(500).json({ message: "Error getting branch", error });
    }
};
export const getAllBranches = async (req, res) => {
    try {
        const branches = await Branch.find(); // Retrieve all branches

        if (!branches || branches.length === 0) {
            return res.status(404).json({ message: "No branches found" });
        }

        res.status(200).json({ message: "Branches found", branches });
    } catch (error) {
        res.status(500).json({ message: "Error getting branches", error: error.message });
    }
};
