const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/add-user", UserController.create);
router.post("/login", UserController.login);
router.get("/user", UserController.findAll);
router.get("/user/:id", UserController.findById);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

module.exports = router;
