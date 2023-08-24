const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboardController');

router
  .route('/')
  .get(dashboard.getDashboard)


module.exports = router; 