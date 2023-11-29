const express = require('express');
const router = express.Router();
const { createJob, singleJob, updateJob, showJobs } = require('../controllers/jobsController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Jobs routes

// POST /api/job/create
router.post('/job/create', isAuthenticated, isAdmin, createJob);
// GET /api/job/:id
router.get('/job/:id', singleJob);
// PUT /api/job/update/:job_id
router.put('/job/update/:job_id', isAuthenticated, isAdmin, updateJob);
// GET /api/jobs/show
router.get('/jobs/show', showJobs);

module.exports = router;
