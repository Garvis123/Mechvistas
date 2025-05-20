const express = require('express');
const router = express.Router();
const clientRoutes = require("./clientRoute")
router.use("/",clientRoutes)
module.exports = router;
