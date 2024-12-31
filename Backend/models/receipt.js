import mongoose, { model } from "mongoose";

const RecieptSchema = new mongoose.Schema({
    reciept_id:{
        type:String,
        unique:true,
        required:true,
    },
    branch_id:{
        type: String, 
        required: true,
    },
    member_id:{
        type: String, 
        required: true,
    },
    reciept_date:{
        type:Date,
        required:true,
    },
    reciept_amount:{
        type:Number,
        required:true,
    },
    reciept_no:{
        type:Number,
        required:true,
    },
    remarks:{
        type:String,
        required:false
    }
});

export default mongoose.model("Reciept", RecieptSchema);