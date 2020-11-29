const express = require('express');

const authController = require('../controllers/authController');
const authValidator = require('../validator/auth');
const productController = require('../controllers/productController');
const userController =  require('../controllers/userController');

const router = express.Router();

/* GET home page. */
router.get('/products', productController.getProducts);

// router.get('/login', (req, res, next) => {
//   res.render('auth/login', { title: 'Login page' });
// });

router.get('/login', authController.login);

router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', { title: 'Admin dashboard' });
});

router.get('/',productController.getFirstListProduct);
router.get('/profile/:userId',userController.getUserById);


router.post('/products', productController.postProduct);
router.post('/register', authController.register);

module.exports = router;
