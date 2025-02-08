const express = require("express");
const { createGroup } = require("./controllers/groupController");
const { createMateria } = require("./controllers/materiaController");

const router = express.Router();

router.post("/api/groups", createGroup);
router.post("/api/materie", createMateria);

module.exports = router;
