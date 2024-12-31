import express from "express";
import { addLedger, getLedgers, editLedger, deleteLedger } from "../controller/ledger.controller.js";

const router = express.Router();

// Add a ledger entry
router.post("/add", addLedger);

// Get all ledger entries
router.get("/", getLedgers);

// Edit a ledger entry
router.put("/edit/:id", editLedger);

// Delete a ledger entry
router.delete("/delete/:id", deleteLedger);

export default router;
