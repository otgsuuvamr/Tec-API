const express = require("express");
const tecController = require("../controllers/tecControllers");
const { tecSchema } = require("../validations/tecValidations");
const validate = require("../middlewares/validate");
const validateID = require("../middlewares/validateID");

const router = express.Router();

router.post("/", validate(tecSchema), tecController.create);
router.put("/:id", validateID, validate(tecSchema), tecController.update);
router.delete("/:id", validateID, validate(tecSchema), tecController.delete);
router.get("/", validate(tecSchema), tecController.read);
router.get("/:id", validateID, validate(tecSchema), tecController.readID);

module.exports = router;