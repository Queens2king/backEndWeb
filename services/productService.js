const db = require('../models/index');
const { Product } = require('../models/index');

exports.getProducts = async function (req) {
	if (JSON.stringify(req.params) === '{}')
	{
		try{
			const productsData = await Product.findAll({
			});
			let products = [];
			for(productData of productsData)
			{
				products.push(productData.dataValues);
			}
			return products;
		} catch(err){
			console.log(err);
			return null;
		}
	}

	return null;	
};

exports.getFirstListProduct = async function (req) {
	try{
		const firstListProduct = await db.sequelize.query(`Select* from product`,{
			type: db.sequelize.QueryTypes.SELECT
		});
		return firstListProduct;
	} catch (err){
		console.log(err);
		return err;
	}
	return null;
}