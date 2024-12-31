import mongoose from "mongoose";

const LedgerSchema = new mongoose.Schema({
    ledger_id:{
        type:String,
        unique:true,
        required:true,
    },
    branch_id: {
        type: String,
        ref: "Branch",
        required: true,
    },
    member_id:{
        type: String, 
        ref: "Member",
        required: true,
    },
    pay_date:{
        type:Date,
        required:true,
    },
    pay_no:{
        type:Number,
        required:true,
    },
    pay_amount:{
        type:Number,
        required:true,
    },
    remarks:{
        type:String,
        required:false
    }
});

export default mongoose.model("Ledger", LedgerSchema);