const express = require('express');

const authController = require('../controllers/authController');
const authValidator = require('../validator/auth');
const productController = require('../controllers/productController');
const productInCartController = require('../controllers/productInCartController');
const cartController = require('../controllers/cartController');
const userController = require('../controllers/userController');
const shopController = require('../controllers/shopController');

const userMiddleware = require('../middleware/userMiddleware');
const fileMiddleware = require('../middleware/fileMiddleware');

const router = express.Router();

/* GET home page. */
router.get('/products', productController.getProducts);

router.get('/login', authController.login);
router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', { title: 'Admin dashboard' });
});

router.get('/',productController.getFirstListProduct);
router.get('/sendMail',authController.sendMail);
// router.get('/profile/:userId',userController.getUserById);
router.get('/profile',userMiddleware.checkToken,userController.getUserById);
router.get('/shopProfile',userMiddleware.checkShopToken,shopController.getShopById);

//Lay san pham theo ID
router.get('/products/:productId', productController.getProductById);
//Lay toan bo san pham theo category
router.get('/category/:categoryId', productController.getProductByCategoryId);
//Lay toan bo san pham cua shop
router.get('/shop/:shop_id/product', productController.getProductByShopId);
//Lay thong tin Shop tu product ID
router.get('/shopProduct/:product_id', productController.getInfoShopByProductId);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/profile',userMiddleware.checkToken,fileMiddleware.uploadFile,userController.updateProfile);
router.post('/shopProfile',userMiddleware.checkShopToken,fileMiddleware.uploadFile,shopController.updateProfile);
router.post('/authRegister',authController.authRegister);
router.post('/shopLogin', authController.shopLogin);
router.post('/shopRegister', authController.shopRegister);

router.post('/shop/:shop_id/product/add',fileMiddleware.uploadProduct,productController.addProduct);

router.post('/productInCart/:user_id/:product_id',productInCartController.createProductInCart);
router.post('/increaseProductInCart/:user_id/:product_id',productInCartController.updateProductInCartIncrease);
router.post('/decreaseProductInCart/:user_id/:product_id',productInCartController.updateProductInCartDecrease);
router.post('/cart/:user_id',cartController.createCart);  
router.post('/updateCart/:user_id',cartController.updateCart); 
router.put('/shop/:shop_id/product/change/:product_id',fileMiddleware.uploadProduct, productController.changeInfoProduct);

module.exports = router;
