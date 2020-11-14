const express = require('express');
const authController = require('../controllers/authController');
const authValidator = require('../validator/auth');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const data= {
    products: [
      {
        product_id: 1,
        product_name: 'TV Sony',
        product_price: 1.0000
      },
      {
        product_id: 2,
        product_name: 'May giat Sony',
        product_price: 9.0000
      },
      {
        product_id: 3,
        product_name: 'Oto Sony',
        product_price: '1.0000'
      },
      {
        product_id: 4,
        product_name: 'Maybay Sony',
        product_price: '1.0000'
      },
      {
        product_id: 5,
        product_name: 'Xetang Sony',
        product_price: '1.0000'
      },
      {
        product_id: 6,
        product_name: 'Xedap Sony',
        product_price: '1.0000'
      }
    ]
  };
  return  res.json(data);
});

// router.get('/login', (req, res, next) => {
//   res.render('auth/login', { title: 'Login page' });
// });

router.get('/login', authController.login);

router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', { title: 'Admin dashboard' });
});

module.exports = router;
