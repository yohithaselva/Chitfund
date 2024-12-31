import Ledger from "../models/ledger.js";

// Add a new ledger entry
export const addLedger = async (req, res) => {
    try {
        const { ledger_id, branch_id, member_id, pay_date, pay_no, pay_amount, remarks } = req.body;

        const newLedger = new Ledger({
            ledger_id,
            branch_id,
            member_id,
            pay_date,
            pay_no,
            pay_amount,
            remarks,
        });

        await newLedger.save();
        res.status(201).json({ message: "Ledger entry added successfully", ledger: newLedger });
    } catch (error) {
        res.status(500).json({ message: "Error adding ledger entry", error });
    }
};

// Get all ledger entries
export const getLedgers = async (req, res) => {
    try {
        const ledgers = await Ledger.find()
            .populate("branch_id member_id", "branch_name member_name"); // Replace field names with actual fields in Branch and Member schemas
        res.status(200).json(ledgers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ledger entries", error });
    }
};

// Edit a ledger entry
export const editLedger = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedLedger = await Ledger.findByIdAndUpdate(id, updates, { new: true })
            .populate("branch_id member_id", "branch_name member_name");
        if (!updatedLedger) {
            return res.status(404).json({ message: "Ledger entry not found" });
        }

        res.status(200).json({ message: "Ledger entry updated successfully", ledger: updatedLedger });
    } catch (error) {
        res.status(500).json({ message: "Error updating ledger entry", error });
    }
};

// Delete a ledger entry
export const deleteLedger = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLedger = await Ledger.findByIdAndDelete(id);
        if (!deletedLedger) {
            return res.status(404).json({ message: "Ledger entry not found" });
        }

        res.status(200).json({ message: "Ledger entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ledger entry", error });
    }
};
