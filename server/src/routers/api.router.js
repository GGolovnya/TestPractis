const router = require("express").Router();
const authRouter = require("./auth.api.router");
const tokenRouter = require("./token.api.router");
const animals = require('./animal.api.router')

router.use("/auth", authRouter);
router.use("/token", tokenRouter);
router.use('/animals', animals)

module.exports = router;
