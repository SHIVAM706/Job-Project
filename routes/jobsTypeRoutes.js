const express = require('express');
const router = express.Router();
const { createJobType, allJobsType, updateJobType, deleteJobType } = require('../controllers/jobsTypeController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Job type routes

// POST /api/type/create
router.post('/type/create', isAuthenticated, isAdmin, createJobType);
// GET /api/type/jobs
router.get('/type/jobs', allJobsType);
// PUT /api/type/update/:type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateJobType);
// DELETE /api/type/delete/:type_id
router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteJobType);

module.exports = router;
