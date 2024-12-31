import express from 'express';
import {
  addEmployee,
  editEmployee,
  deleteEmployee,
  getAllEmployees,
  loginEmployee,
  getEmployeeById,
  searchEmployees // Added search route
} from '../controller/employee.controller.js';

const router = express.Router();

// Define routes
router.post('/add', addEmployee);
router.put('/edit/:id', editEmployee);
router.delete('/delete/:id', deleteEmployee);
router.get('/all', getAllEmployees); // Optional: Get all employees
router.post('/login', loginEmployee);
router.get('/employee/:id', getEmployeeById);
router.get('/search', searchEmployees); // Search employees route

export default router;
