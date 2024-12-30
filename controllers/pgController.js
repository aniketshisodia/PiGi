const PG = require('../model/pgModel'); // Import the PG Mongoose model
const multer = require('multer');
const sharp = require('sharp');
// ********************************************************************************************//

// STEP 1 :- Upload Image

// Configure Multer to store files in memory
const multerStorage = multer.memoryStorage();

// Filter function to allow only image files
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);  // Allow image files
    } else {
        cb(null, false); // Reject non-image files
    }
};

// Initialize Multer with storage and filter options
const upload = multer({
    storage: multerStorage, // Store the file in memory temporarily
    fileFilter: multerFilter, // Use the filter to check file type
});

// ********************************************************************************************//




// ********************************************************************************************//

// STEP 2 :- Resize Image

// Export the upload middleware for use in routes
exports.uploadPGImage = upload.single('image'); // Accept a single image file with field name 'image'

exports.resizePGImage = async (req, res, next) => {
    if (!req.file) return next(); // Skip processing if no file is uploaded

    const filename = `pg-${Date.now()}.jpeg`; // Generate a unique filename using the current timestamp
    req.file.filename = filename; // Attach the filename to the request object

    try {
        // Use sharp to process the image buffer, resize, and save as JPEG
        await sharp(req.file.buffer)
            .resize(800, 800) // Resize image to 800x800 pixels
            .toFormat('jpeg') // Convert to JPEG format
            .jpeg({ quality: 90 }) // Set JPEG quality to 90
            .toFile(`public/img/pgs/${filename}`); // Save the file in the 'public/img/pgs/' directory

        next(); // Move to the next middleware (e.g., save PG details to DB)
    } catch (err) {
        res.status(500).json({ status: 'fail', message: 'Image processing failed.' }); // Error if image processing fails
    }
};
// ********************************************************************************************//



// ********************************************************************************************//

// STEP 3 :- Save Image

exports.createPG = async (req, res) => {
    try {
        // Save PG details in the database, including the image filename
        const newPG = await PG.create({
            ...req.body, // Other PG details (e.g., name, address, price)
            image: req.file ? req.file.filename : undefined, // Save image filename if available
        });

        // Respond with the created PG data
        res.status(201).json({
            status: 'success',
            data: {
                pg: newPG,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// ********************************************************************************************//
