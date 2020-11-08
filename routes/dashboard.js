const router = require("express").Router();
const authGuard = require("./guards/auth.guard");
const dashController = require("../controllers/dashboardController");


router.get("/", authGuard.isAuth, dashController.getMag);

module.exports = router;