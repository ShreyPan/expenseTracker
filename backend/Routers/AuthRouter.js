const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");
const { signup, login } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/login", async (req, res) => {
    res.send("Login Success");
});

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router;