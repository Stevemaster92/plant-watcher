const router = require("express").Router();
const auth = require("./api/auth");
const stations = require("./api/stations");

router.use("/auth", auth);
router.use("/stations", stations);

module.exports = router;
