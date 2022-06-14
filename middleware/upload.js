// https://www.bezkoder.com/node-js-upload-store-images-mongodb/

const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

var storage = new GridFsStorage({
    url: "mongodb+srv://webdev:MeinCoolesPassword@cluster0.2snr7nl.mongodb.net/?retryWrites=true&w=majority",
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: 'admin',
    },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: 'images',
            filename: `${Date.now()}-${file.originalname}`
        };
    }
});
var uploadFiles = multer({ storage: storage }).single('file');
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;