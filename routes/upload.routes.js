const controller = require('../controllers/upload.controller');
const { authJwt } = require("../middleware");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/upload", [authJwt.verifyToken], controller.upload);
    app.get("/api/download/:filename", controller.download);

};