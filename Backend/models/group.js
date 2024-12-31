import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    group_id:{
        type:String,
        unique:true,
        required:true,
    },
    branch_id:{
        type: String, 
        required: true,
    },
    gname: {
        type: String,
        required: true,
        unique: true,
    },
   max_clients:{
        type:Number,
        required: true,
   },
   scheme_id:{
        type: String, 
        required: true,
   },
   start_date: {
        type: Date,
        required: true,
    }
});

export default mongoose.model("Group", GroupSchema);