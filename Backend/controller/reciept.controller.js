import Reciept from "../models/receipt.js";

// Add a new receipt
export const addReciept = async (req, res) => {
    try {
        const {
            reciept_id,
            branch_id,
            member_id,
            reciept_date,
            reciept_amount,
            reciept_no,
            remarks,
        } = req.body;

        const newReciept = new Reciept({
            reciept_id,
            branch_id,
            member_id,
            reciept_date,
            reciept_amount,
            reciept_no,
            remarks,
        });

        await newReciept.save();
        res.status(201).json({ message: "Reciept added successfully", reciept: newReciept });
    } catch (error) {
        res.status(500).json({ message: "Error adding reciept", error });
    }
};

// Get all receipts
export const getReciepts = async (req, res) => {
    try {
        const reciepts = await Reciept.find();
        res.status(200).json(reciepts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reciepts", error });
    }
};

// Edit a receipt
export const editReciept = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedReciept = await Reciept.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedReciept) {
            return res.status(404).json({ message: "Reciept not found" });
        }

        res.status(200).json({ message: "Reciept updated successfully", reciept: updatedReciept });
    } catch (error) {
        res.status(500).json({ message: "Error updating reciept", error });
    }
};

// Delete a receipt
export const deleteReciept = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedReciept = await Reciept.findByIdAndDelete(id);
        if (!deletedReciept) {
            return res.status(404).json({ message: "Reciept not found" });
        }

        res.status(200).json({ message: "Reciept deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting reciept", error });
    }
};
