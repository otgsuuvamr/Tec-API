const express = require("express");
const tecController = require("../controllers/tecControllers");
const { createSchema } = require("../validations/createSchema");
const { updateSchema } = require("../validations/updateSchema");
const validate = require("../middlewares/validate");
const CheckID = require("../middlewares/CheckID");

const router = express.Router();

router.post("/", validate(createSchema), tecController.create);
router.put("/:id", CheckID, validate(updateSchema), tecController.update);
router.delete("/:id", CheckID, validate(createSchema), tecController.delete);
router.get("/", validate(createSchema), tecController.read);
router.get("/:id", CheckID, validate(createSchema), tecController.readID);

module.exports = router;