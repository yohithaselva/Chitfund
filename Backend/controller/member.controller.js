import Member from "../models/member.js";

// Add a new member
export const addMember = async (req, res) => {
    try {
        const {
            member_id,
            branch_id,
            mem_name,
            gender,
            dob,
            age,
            address,
            pincode,
            phone,
            mobile,
            nominee_name,
            uid,
            photo,
            active,
        } = req.body;

        const newMember = new Member({
            member_id,
            branch_id,
            mem_name,
            gender,
            dob,
            age,
            address,
            pincode,
            phone,
            mobile,
            nominee_name,
            uid,
            photo,
            active,
        });

        await newMember.save();
        res.status(201).json({ message: "Member added successfully", member: newMember });
    } catch (error) {
        res.status(500).json({ message: "Error adding member", error });
    }
};

// Get all members
export const getMembers = async (req, res) => {
    try {
        const members = await Member.find().populate("branch_id", "branch_name"); // Replace "branch_name" with actual field from the Branch schema
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: "Error fetching members", error });
    }
};

// Edit a member
export const editMember = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedMember = await Member.findByIdAndUpdate(id, updates, { new: true }).populate("branch_id", "branch_name");
        if (!updatedMember) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.status(200).json({ message: "Member updated successfully", member: updatedMember });
    } catch (error) {
        res.status(500).json({ message: "Error updating member", error });
    }
};

// Delete a member
export const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMember = await Member.findByIdAndDelete(id);
        if (!deletedMember) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting member", error });
    }
};
