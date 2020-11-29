const db = require('../models/index');
const product = db['Product'];

const authService = require('../services/authService');

exports.login = async (req, res, next) => {
  try{
    const newProduct =  await product.create({
      product_name:'am dien///',
      category_id: 6,
      product_image: `Image Product/Điện lạnh - Điện gia dụng/Tủ lạnh Aqua Inverter 340L AQR-T359MA(BS).jpeg`,
      product_price: 19,
      product_description: 'anh em tao dep trai',
      quantityInStock: 3

    });
    // const newProduct = await product.findOne({
    //   where: {
    //     product_id: 65
    //   }
    // });
    // console.log(product.dataValues)
    return res.render('index',{ product: newProduct.dataValues });
  } catch(err){
    console.log(err);
    return res.render('index',{ title: err });
  }
  
};

exports.register = async(req,res) => {
  const registerResult = await authService.register(req);
  return res.json(registerResult);
}
