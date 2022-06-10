const multer = require('multer');
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    const upload = multer({
        dest: './uploads/'
    });

    app.post('/api/upload', upload.single('file'), (req, res) => {
        res.send(req.file);
    }
    );

};