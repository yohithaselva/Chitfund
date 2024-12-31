import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the Employee schema
const EmployeeSchema = new mongoose.Schema(
  {
    emp_id: {
      type: String,
      required: true,
      unique:true
    },
    emp_name: {
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
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      minlength: 6, 
    },
    status: {
      type: String,
      default: 'Active',
    },
    address: {
      type: String,
      required: true,
    },
    role: {  
      type: String,
      enum: ['admin', 'manager', 'employee'], 
      default: 'employee', 
    },
    photo: {
      type: String, // Expect a string path or URL
      default: '../assets/user.png', // Correctly formatted relative path
    },
  },
  { timestamps: true } // Add createdAt and updatedAt fields
);

// Hash password before saving the employee document
EmployeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified or new
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
EmployeeSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Create and export the Employee model
export default mongoose.model('Employee', EmployeeSchema);
