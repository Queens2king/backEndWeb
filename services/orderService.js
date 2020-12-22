const moment = require('moment');

const {Order} = require('../models/index');
const {Product} = require('../models/index');
const {OrderDetail} = require('../models/index');
const db = require('../models/index');

exports.createOrder = async (req) => {
    try{
        // lấy list các shop có trong cart của user
        const shopIdList = (await Promise.all(
            req.body.cart.map((product) => 
                Product.findOne({ where: {
                    product_id: product.id
                }})
            )
        )).map((productModel) =>productModel.dataValues.shop_id);
        // lọc những thằng trùng nhau để ra shopIdList chuẩn
        const fileredShopIdList = shopIdList.filter(function(number,index=shopIdList.indexOf(number)){
            return number!=shopIdList[index+1];
        });
        // Lưu địa chỉ giao hàng
        const comment = "CITY "+req.body.form.city+" DISTRICT "+req.body.form.district;
        // Tạo các order ứng với mỗi shop_id
        const newOrders = (await Promise.all(fileredShopIdList.map(shop_id => Order.create({
            user_id : req.params.user_id,
            comment: comment,
            shop_id: shop_id,
            orderDate : moment(),
            createdAt : moment(),
            updatedAt : moment()
            })
        ))).map(order => order.dataValues);
    // Tạo các orderDetail
        const newOrdersDetail = (await Promise.all(newOrders.map(
            newOrder => {
                return Promise.all(shopIdList.map((shopId,index) =>{
                    if(shopId === newOrder.shop_id)
                    return OrderDetail.create({
                        order_id: newOrder.order_id,
                        product_id: req.body.cart[index].id,
                        quantity: req.body.cart[index].quantity,
                        priceEach: req.body.cart[index].price
                    })
                }))
            }
        ))).map(newOrderDetail => newOrderDetail.dataValues);
        // update numsale của product
        const ProductList = await Promise.all(
            req.body.cart.map((product) => 
                Product.findByPk(product.id)
            )
        );
        const updatedProductList = await Promise.all(
            ProductList.map((productResult,index) => {
                productResult.nosale += req.body.cart[index].quantity;
                return productResult.save();
            })
        );
        return newOrdersDetail;
    } catch (err)
    {
        console.log(err);
        return null;
    }
}

exports.getOrders = async (req) => {
    try{
        const userOrders= await db.sequelize.query(`
        SELECT * FROM orderdetail
            join product on orderdetail.product_id = product.product_id
            join shopshop1.order on orderdetail.order_id = order.order_id
            where order.user_id = ${req.params.user_id} and order.status = 'ordered'
        `,
            {
                type: db.sequelize.QueryTypes.SELECT
            }
        );
        return userOrders;
    } catch(err){
        console.log(err);
        return null;
    }
}