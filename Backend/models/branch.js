import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({
    branch_id: {
        type: String,
        required: true,
        unique: true,
    },
    bname: {
        type: String,
        required: true,
        unique: true,
    },
    parent_id:{
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
 });

export default mongoose.model("Branch", BranchSchema);
