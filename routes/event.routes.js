const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/events", [authJwt.verifyToken], controller.getAllEvents);
    app.post("/api/event/create", [authJwt.verifyToken], controller.create);
    app.post("/api/event/change", [authJwt.verifyToken], controller.change);
    app.post("/api/event/delete", [authJwt.verifyToken], controller.delete);
    app.post("/api/event/participate", [authJwt.verifyToken], controller.participate);
    app.post("/api/event/unparticipate", [authJwt.verifyToken], controller.unparticipate);
};
