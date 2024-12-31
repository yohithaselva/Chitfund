import Employee from '../models/employee.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Add Employee
export const addEmployee = async (req, res) => {
    try {
      const { emp_id } = req.body;
  
      if (!emp_id) {
        return res.status(400).json({ error: 'Employee ID (emp_id) is required' });
      }
  
      const existingEmployee = await Employee.findOne({ emp_id });
      if (existingEmployee) {
        return res.status(400).json({ error: 'Employee ID (emp_id) must be unique' });
      }
  
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).json({ message: 'Employee added successfully', employee });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

// Edit Employee
export const editEmployee = async (req, res) => {
  const { id } = req.params; // Use `emp_id` to identify the employee
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { emp_id: id }, // Correct filter to use emp_id
      { $set: req.body },
      { new: true }
    );
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  console.log(id); 
  try {
    const deletedEmployee = await Employee.findOneAndDelete({ emp_id: id });

    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Employees (Optional)
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees
    res.status(200).json(employees); // Return the employee data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching employees' }); // Error handling
  }
};

// Controller to fetch an employee by emp_id
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({ emp_id: req.params.emp_id }); // Find employee by emp_id
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee); // Return the specific employee data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching employee' }); // Error handling
  }
}

export const loginEmployee = async (req, res) => {
  const { emp_id, password } = req.body;

  if (!emp_id || !password) {
    return res.status(400).json({ error: 'Employee ID and password are required' });
  }

  try {
    // Find employee by emp_id
    const employee = await Employee.findOne({ emp_id });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Compare passwords
    const isMatch = await employee.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        emp_id: employee.emp_id,
        photo: employee.photo,
        role: employee.role,
        emp_name: employee.emp_name 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response with all required data at the root level
    res.status(200).json({
      message: 'Login successful',
      token,
      role: employee.role,
      emp_id: employee.emp_id,
      photo: employee.photo,
      emp_name: employee.emp_name
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Search Employees
export const searchEmployees = async (req, res) => {
  try {
    const { query } = req.query; // Search query from request

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Use case-insensitive regex search for `emp_id`, `emp_name`, and `role` fields
    const employees = await Employee.find({
      $or: [
        { emp_id: { $regex: new RegExp(query, "i") } },
        { emp_name: { $regex: new RegExp(query, "i") } },
        { role: { $regex: new RegExp(query, "i") } }
      ]
    });

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    res.status(200).json({ message: "Employees found", employees });
  } catch (error) {
    console.error(error); // Optional: Log error for debugging
    res.status(500).json({ message: "Error searching employees", error: error.message });
  }
};