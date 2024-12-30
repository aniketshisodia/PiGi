const express = require('express');
const pgController = require('../controllers/pgController');
const router = express.Router();

// Route to create a PG listing with image upload
router.post(
    '/create',
    pgController.uploadPGImage, // Handle image upload
    pgController.resizePGImage, // Resize the image
    pgController.createPG // Save the PG details to the database
);

module.exports = router;
