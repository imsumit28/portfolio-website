const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
]);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = ALLOWED_EXT.has(ext) ? ext : '.bin';
    const random = crypto.randomBytes(8).toString('hex');
    cb(null, `${file.fieldname}-${Date.now()}-${random}${safeExt}`);
  }
});

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return cb(new Error('Only image files (jpg, jpeg, png, webp, gif) are allowed'));
  }
  if (!ALLOWED_MIME.has(file.mimetype)) {
    return cb(new Error('Invalid image mime type'));
  }
  cb(null, true);
}

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1
  },
  fileFilter
});

// Magic-byte signatures for the formats we accept. The extension and the
// client-supplied mime type are both attacker-controlled, so we also verify
// the real file content before trusting it.
const IMAGE_MAGIC = [
  { name: 'jpg', bytes: [0xff, 0xd8, 0xff] },
  { name: 'png', bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { name: 'gif', bytes: [0x47, 0x49, 0x46, 0x38] } // "GIF8"
];

const matchesImageSignature = (buf) => {
  const hasPrefix = IMAGE_MAGIC.some(
    (sig) => buf.length >= sig.bytes.length && sig.bytes.every((b, i) => buf[i] === b)
  );
  if (hasPrefix) return true;
  // WEBP is a RIFF container: "RIFF" .... "WEBP"
  return (
    buf.length >= 12 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP'
  );
};

// Run after `upload.single(...)`. Reads the first bytes of the file multer just
// wrote and deletes it if the content is not a real image of an allowed type.
const verifyImageSignature = (req, res, next) => {
  if (!req.file) return next();
  const filePath = req.file.path;
  let fd;
  try {
    fd = fs.openSync(filePath, 'r');
    const buf = Buffer.alloc(12);
    fs.readSync(fd, buf, 0, 12, 0);
    fs.closeSync(fd);
    fd = undefined;
    if (!matchesImageSignature(buf)) {
      fs.unlink(filePath, () => {});
      return res.status(400).json({ message: 'Uploaded file is not a valid image' });
    }
    return next();
  } catch (err) {
    if (fd !== undefined) {
      try { fs.closeSync(fd); } catch { /* already closed */ }
    }
    fs.unlink(filePath, () => {});
    return res.status(400).json({ message: 'Could not validate uploaded image' });
  }
};

module.exports = { upload, verifyImageSignature };
