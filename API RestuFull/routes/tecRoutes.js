const express = require("express");
const tecController = require("../controllers/tecControllers");

const router = express.Router();

router.post("/", tecController.create);
router.put("/:id", tecController.update);
router.delete("/:id", tecController.delete);
router.get("/", tecController.read);
router.get("/:id", tecController.readID);

module.exports = router;