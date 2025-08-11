const express = require("express");
const router = express.Router();
const productController = require("../controllers/productControllers");
const validateProduct = require("../middlewares/products/validateProduct");
const CheckID = require("../middlewares/CheckID");

router.post("/", validateProduct, productController.create);
router.put("/:id", CheckID, validateProduct, productController.update);
router.delete("/:id", CheckID, productController.delete);
router.get("/", productController.read);
router.get("/:id", CheckID, productController.readID);

module.exports = router;
