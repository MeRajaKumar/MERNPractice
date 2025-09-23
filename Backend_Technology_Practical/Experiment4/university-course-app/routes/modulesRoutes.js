const express = require("express");
const router = express.Router();
const modulesController = require("../controllers/modulesController");

router.get("/", modulesController.getModules);
router.get("/:id", modulesController.getModuleById);
router.post("/", modulesController.addModule);
router.put("/:id", modulesController.updateModule);
router.delete("/:id", modulesController.deleteModule);

module.exports = router;
