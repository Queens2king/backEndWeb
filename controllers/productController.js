const productService = require('../services/productService');

exports.getProducts = async (req, res, next) => {
  const products = await productService.getProducts(req);
  return res.json(products);
};


exports.postProduct = (req, res, next) => {
  const data = req.body;
  return res.json(data);
};

exports.getFirstListProduct = async (req,res) => {
  const firstListProduct = await productService.getFirstListProduct(req);
  return res.json(firstListProduct);
}