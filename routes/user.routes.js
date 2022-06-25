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
    app.post("/api/image", [authJwt.verifyToken], controller.saveImage);
    app.get("/api/users", [authJwt.verifyToken], controller.getAllUsers);
    app.put("/api/user/role/:id", [authJwt.verifyToken], controller.updateUser);
    app.put("/api/user/:id", [authJwt.verifyToken], controller.setUserData);
    app.get("/api/user/:id", [authJwt.verifyToken], controller.getUserData);
    app.delete("/api/user/:id", [authJwt.verifyToken], controller.deleteUser);
};