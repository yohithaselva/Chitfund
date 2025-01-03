import express from 'express';
import { addGroup, getGroups, editGroup, deleteGroup, getBranchIdsFromGroups, searchGroups } from '../controller/group.controller.js';

const router = express.Router();

// Define your routes
router.post('/add', addGroup);
router.get('/get', getGroups);
router.put('/edit/:id', editGroup);
router.delete('/delete/:id', deleteGroup);
router.get('/branchIds', getBranchIdsFromGroups);
router.get('/search', searchGroups);

export default router;
