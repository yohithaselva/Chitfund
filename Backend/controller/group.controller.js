import Group from "../models/group.js";

// Add a new group
export const addGroup = async (req, res) => {
    try {
        const { group_id, branch_id, gname, max_clients, scheme_id, start_date } = req.body;

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
        res.status(500).json({ message: "Error adding group", error });
    }
};

// Get all groups
export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: "Error fetching groups", error });
    }
};

// Edit a group
export const editGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedGroup = await Group.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedGroup) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.status(200).json({ message: "Group updated successfully", group: updatedGroup });
    } catch (error) {
        res.status(500).json({ message: "Error updating group", error });
    }
};

// Delete a group
export const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedGroup = await Group.findByIdAndDelete(id);
        if (!deletedGroup) {
            return res.status(404).json({ message: "Group not found" });
        }

        res.status(200).json({ message: "Group deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting group", error });
    }
};
