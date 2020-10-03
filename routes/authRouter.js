const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const verify = require("../middlewares/verifyToken");

router.post("/register", userCtrl.register);
router.post("/loggin", userCtrl.login);
router.get("/loggin", userCtrl.getLogin);
router.get("/register", userCtrl.getRegister);
router.get("/", verify, userCtrl.getIndex);

module.exports = router;
