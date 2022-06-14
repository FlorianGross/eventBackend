// https://www.bezkoder.com/node-js-express-file-upload/

const uploadFile = require('../middleware/upload');
const upload = async (req, res) => {
    try {
        const file = await uploadFile(req, res);
        if (req.file === undefined) {
            res.status(400).json({
                message: 'No file uploaded'
            });
        }
        res.status(200).json({
            message: 'File uploaded successfully',
            file: file
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error uploading file',
            error: err
        });
    }
}
const download = (req, res) => {
    const file = req.params.filename;
    const directory = './uploads/';
    res.download(directory + file, file, (err) => {
        if (err) {
            res.send(err);
        }
    });
}

module.exports = {
    upload,
    download
}