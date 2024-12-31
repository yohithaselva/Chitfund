import Scheme from "../models/scheme.js";

// Add a new scheme
export const addScheme = async (req, res) => {
    try {
        const { scheme_id, scheme_name, amount, after_amount, tenure, enabled } = req.body;

        const newScheme = new Scheme({
            scheme_id,
            scheme_name,
            amount,
            after_amount,
            tenure,
            enabled,
        });

        await newScheme.save();
        res.status(201).json({ message: "Scheme added successfully", scheme: newScheme });
    } catch (error) {
        res.status(500).json({ message: "Error adding scheme", error });
    }
};

// Get all schemes
export const getSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.status(200).json(schemes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching schemes", error });
    }
};

// Edit a scheme
export const editScheme = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedScheme = await Scheme.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedScheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }

        res.status(200).json({ message: "Scheme updated successfully", scheme: updatedScheme });
    } catch (error) {
        res.status(500).json({ message: "Error updating scheme", error });
    }
};

// Delete a scheme
export const deleteScheme = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedScheme = await Scheme.findByIdAndDelete(id);
        if (!deletedScheme) {
            return res.status(404).json({ message: "Scheme not found" });
        }

        res.status(200).json({ message: "Scheme deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting scheme", error });
    }
};
