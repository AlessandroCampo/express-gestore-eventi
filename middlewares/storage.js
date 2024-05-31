const multer = require('multer');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify')


module.exports = multer.diskStorage({
    destination: (req, file, cb) => {

        const uploadPath = path.join(__dirname, '../public/images');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const data = req.body
        cb(null, (slugify(data.title) + Date.now() || 'img-' + Date.now()) + path.extname(file.originalname));
    }
});
