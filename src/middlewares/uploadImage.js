const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ALLOWED = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif' };

module.exports = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
  const up = multer({
    storage: multer.diskStorage({
      destination: dir,
      filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname).toLowerCase())
    }),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ALLOWED[ext] && ALLOWED[ext] === file.mimetype) return cb(null, true);
      req.fileError = 'La imagen debe ser un archivo JPG, JPEG, PNG o GIF.';
      cb(null, false);
    }
  });
  return {
    single: (field) => (req, res, next) => up.single(field)(req, res, (err) => {
      if (err) req.fileError = err.code === 'LIMIT_FILE_SIZE' ? 'La imagen no puede pesar más de 2 MB.' : err.message;
      next();
    })
  };
};
