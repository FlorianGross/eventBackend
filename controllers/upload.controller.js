// https://www.bezkoder.com/node-js-express-file-upload/

const uploadFile = require('../middleware/upload');
const upload = async (req, res) => {
    try {
        const file = await uploadFile(req, res);
        if (req.file === undefined) {
            res.status(400).json({
                message: 'No file uploaded'
            });
            console.log('No file uploaded');
        }
        res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file.filename
        });
        console.log('File uploaded successfully' + file);
    }
    catch (err) {
        res.status(500).json({
            message: 'Error uploading file',
            error: err
        });
        console.log('Error uploading file '+ err);
    }
}
const download = (req, res) => {
    console.log('Downloading file');
    const file = req.params.filename;
    const directory = __basedir + '/resources/static/assets/uploads/';
    console.log(directory + file);
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