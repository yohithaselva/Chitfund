import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema({
    scheme_id:{
        type:String,
        unique:true,
        required:true,
    },
    scheme_name:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    after_amount:{
        type:Number,
        required:true,
    },
    tenure:{
        type:Number,
        required:true,
    },
    enabled:{
        type: Boolean,
        default: true,
    }
});

export default mongoose.model('Scheme', SchemeSchema);