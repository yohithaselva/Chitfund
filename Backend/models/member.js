import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    member_id: {
        type: String,
        required: true,
        unique: true,
    },
    branch_id: {
        type: String,
        required: true,
    },
    mem_name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    nominee_name: {
        type: String,
        required: true,
    },
    uid: {
        type: Number,
        required: true,
        unique: true,
    },
    photo: {
        data: Buffer,
        contentType: String,

    },
    active: {
        type: Boolean,
        default: true, 
    }
});

export default mongoose.model('Member', MemberSchema);


