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

exports.getProductById = async (req, res) => {
	const ProductById = await productService.getProductById(req);
	return res.json(ProductById);
}
exports.getProductByCategoryId = async (req, res) =>{
	const productByCategoryId = await productService.getProductByCategoryId(req);
	return res.json(productByCategoryId);
}

exports.addProduct = async(req, res) => {
	const newproduct = await productService.addProduct(req,res);
	return res.json(newproduct);
}