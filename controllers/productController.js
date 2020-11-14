const productService = require('../services/productService');

exports.getProducts = async (req, res, next) => {
  const products = await productService.getProducts(req);
  return res.json(products);
};
