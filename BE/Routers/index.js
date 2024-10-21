const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use(require("./karyawanRoutes"));
router.use(require("./userRoutes"));

module.exports = router;
