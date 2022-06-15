// https://www.bezkoder.com/node-js-express-file-upload/
const util = require('util');
const multer = require('multer');
const maxSize = 10 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __basedir + '/resources/static/assets/uploads/');
    }, 
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
}
);
const upload = multer({ storage: storage, limits: { fileSize: maxSize } }).single('file');
let uploadFileMiddleware = util.promisify(upload);
module.exports = uploadFileMiddleware;
