const express = require("express");
const tecController = require("../controllers/tecControllers");
const { productSchema } = require("../validations/productSchema");
const validate = require("../middlewares/validate");
const CheckID = require("../middlewares/CheckID");

const router = express.Router();

router.post("/", validate(productSchema, true), tecController.create);
router.put("/:id", CheckID, validate(productSchema), tecController.update);
router.delete("/:id", CheckID, tecController.delete);
router.get("/", tecController.read);
router.get("/:id", CheckID, tecController.readID);

module.exports = router;