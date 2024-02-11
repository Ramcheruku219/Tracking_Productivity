const express = require("express");

const router = express.Router();

const createUser = require("../../src/controller/users/user.controller");

// Define user routes

router.post("/", createUser.create);
router.get("/", createUser.getAll);
router.get("/:id", createUser.find);
router.put("/:id", createUser.update);
router.delete("/:id", createUser.delete);

module.exports = router;