const router = require("express").Router();
const authRouter = require("./auth.api.router");
const tokenRouter = require("./token.api.router");
const animals = require('./animal.api.router');
const arrayexamples = require('./arrayexamples.api.router');
const arraymethod = require('./arraymethod.api.router');
const car = require('./car.api.router');
const datatypesexample = require('./datatypesexample.api.router');
const objectexamples = require('./objectexamples.api.router');
const product = require('./product.api.router');
const transaction = require('./transaction.api.router');

router.use("/auth", authRouter);
router.use("/token", tokenRouter);
router.use('/animals', animals);
router.use('/arrayexamples', arrayexamples);
router.use('/arraymethod', arraymethod);
router.use('/car', car);
router.use('/datatypesexample', datatypesexample);
router.use('/objectexamples', objectexamples);
router.use('/product', product);
router.use('/transaction', transaction);

module.exports = router;