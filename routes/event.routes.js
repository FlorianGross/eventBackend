const { authJwt } = require("../middleware");
const controller = require("../controllers/event.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
        console.log(res)
    });
    app.get("/api/events", [authJwt.verifyToken], controller.getAllEvents);
    app.post("/api/event/", [authJwt.verifyToken], controller.create);
    app.get("/api/event/:id", [authJwt.verifyToken], controller.getOneEvent);
    app.put("/api/event/:id", [authJwt.verifyToken], controller.change);
    app.delete("/api/event/:id", [authJwt.verifyToken], controller.delete);
    app.put("/api/event/participants/:id", [authJwt.verifyToken], controller.participate);
    app.get("/api/event/participants/:id", [authJwt.verifyToken], controller.getAllParticipants);
    app.put("/api/event/preOrder/:id", [authJwt.verifyToken], controller.preOrder);
    app.get("/api/event/preorder/:id", [authJwt.verifyToken], controller.getPreOrder);
    app.get("/api/events/users/:id", [authJwt.verifyToken], controller.getAllEventsWhereUserIsInvolved);
};
