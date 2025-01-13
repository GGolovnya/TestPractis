const router = require("express").Router();
const newPasswordRouter = require("./newPassword.api.router");
const resetPasswordRouter = require("./resetPassword.api.router");
const authRouter = require("./auth.api.router");
const tokenRouter = require("./token.api.router");

router.use("/auth/new-password", newPasswordRouter);
router.use("/auth/reset-password", resetPasswordRouter);
router.use("/auth", authRouter);
router.use("/token", tokenRouter);

module.exports = router;
