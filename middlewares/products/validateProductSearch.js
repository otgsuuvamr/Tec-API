// middlewares/products/validateProductSearch.js
const {
  productSearchSchema,
} = require("../../validations/productSearchSchema");

module.exports = (req, res, next) => {
  const { error, value } = productSearchSchema.validate(req.query, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details.map((d) => d.message).join(", ") });
  }
  req.query = value;
  next();
};
