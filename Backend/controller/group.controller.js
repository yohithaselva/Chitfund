import Group from "../models/group.js";
import Branch from "../models/branch.js";

export const addGroup = async (req, res) => {
    try {
        const { group_id, branch_id, gname, max_clients, scheme_id, start_date } = req.body;

        // Validate if branch exists
        const branchExists = await Branch.findById(branch_id);
        if (!branchExists) {
            return res.status(404).json({ message: "Branch not found" });
        }

        // Check if group_id already exists
        const existingGroup = await Group.findOne({ group_id });
        if (existingGroup) {
            return res.status(400).json({ message: "Group ID already exists" });
        }

        const newGroup = new Group({
            group_id,
            branch_id,
            gname,
            max_clients,
            scheme_id,
            start_date,
        });

        await newGroup.save();
        res.status(201).json({ message: "Group added successfully", group: newGroup });
    } catch (error) {
        res.status(500).json({ message: "Error adding group", error: error.message });
    }
};

export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find()
            .populate('branch_id', 'branch_id bname')
            .sort({ createdAt: -1 });
        
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: "Error fetching groups", error: error.message });
    }
};

export const editGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Validate if branch exists if branch_id is being updated
        if (updates.branch_id) {
            const branchExists = await Branch.findById(updates.branch_id);
            if (!branchExists) {
                return res.status(404).json({ message: "Branch not found" });
            }
        }

        const updatedGroup = await Group.findByIdAndUpdate(
            id, 
            updates,
            { new: true, runValidators: true }
        ).populate('branch_id', 'branch_id bname');

        if (!updatedGroup) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.status(200).json({ message: "Group updated successfully", group: updatedGroup });
    } catch (error) {
        res.status(500).json({ message: "Error updating group", error: error.message });
    }
};

export const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedGroup = await Group.findByIdAndDelete(id);
        if (!deletedGroup) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.status(200).json({ message: "Group deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting group", error: error.message });
    }
};

export const getBranchIdsFromGroups = async (req, res) => {
    try {
        const branches = await Branch.find({}, 'branch_id').sort({ branch_id: 1 });
        const branchIds = branches.map(branch => branch.branch_id);
        res.status(200).json(branchIds);
    } catch (error) {
        res.status(500).json({ message: "Error fetching branch IDs", error: error.message });
    }
};

export const searchGroups = async (req, res) => {
    try {
        const { gname, group_id } = req.query;

        const query = {};
        if (gname) {
            query.gname = { $regex: gname, $options: "i" };
        }
        if (group_id) {
            query.group_id = { $regex: group_id, $options: "i" };
        }

        const groups = await Group.find(query)
            .populate('branch_id', 'branch_id bname')
            .sort({ createdAt: -1 });

        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: "Error searching groups", error: error.message });
    }
};