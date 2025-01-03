import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true,
    unique: true
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true
  },
  gname: {
    type: String,
    required: true
  },
  max_clients: {
    type: Number,
    required: true,
    min: 1
  },
  scheme_id: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  }
});

export default mongoose.model('Group', groupSchema);