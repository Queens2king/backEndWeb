const express = require('express');

const authController = require('../controllers/authController');
const authValidator = require('../validator/auth');
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');

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

//Lay san pham theo ID
router.get('/products/:productId', productController.getProductById);
//Lay toan bo san pham theo category
router.get('/category/:categoryId', productController.getProductByCategoryId);


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/profile',userMiddleware.checkToken,fileMiddleware.uploadFile,userController.updateProfile);
router.post('/authRegister',authController.authRegister);


router.post('/shop/:shop_id/product/add',fileMiddleware.uploadProduct,productController.addProduct);


module.exports = router;
