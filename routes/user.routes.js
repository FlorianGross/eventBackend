const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/users", [authJwt.verifyToken], controller.getAllUsers);
    app.post("/api/updateUser", [authJwt.verifyToken], controller.updateUser);
    app.post("/api/setUserData", [authJwt.verifyToken], controller.setUserData);
    app.post("/api/getUserData", [authJwt.verifyToken], controller.getUserData);
};