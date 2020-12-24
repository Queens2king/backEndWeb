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
                productResult.quantityInStock -= req.body.cart[index].quantity;
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
            join shopshop.order on orderdetail.order_id = order.order_id
            where order.user_id = ${req.params.user_id}
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

exports.getOrderByIdUser = async function(req) {
	try {
		const orderByIdUser = await db.sequelize.query(`SELECT status, user_id, orderDate, requiredDate, shippedDate,order_id,(SELECT SUM(priceEach * quantity) FROM orderdetail WHERE o.order_id = orderdetail.order_id) AS 'total' FROM shopshop.order o 
			WHERE user_id = ${req.params.user_id}`,{
			type: db.sequelize.QueryTypes.SELECT
		});
		return orderByIdUser;
		
	}
	catch(err){
		console.log(err);
		return null;
	}
}

exports.getRecentOrderByShopId = async function (req){
	try{
		const listOrder = await Order.findAll({
			where :{
				shop_id : req.params.shop_id
			},
			order :[["orderDate","DESC"]],
			limit : 5
		});
		const orders = [];
		for(order of listOrder)
			orders.push(order.dataValues);
		return orders;
	}
	catch(err){
		console.log(err);
		return null;
	}
}

exports.getOrderByShopId = async function(req){
	try{
		const orderByShopId = await db.sequelize.query(`SELECT status, orderDate, requiredDate, shippedDate,order_id,(SELECT SUM(priceEach * quantity) FROM orderdetail WHERE o.order_id = orderdetail.order_id) AS 'total' FROM shopshop.order o 
			WHERE shop_id = ${req.params.shop_id}`,{
			type: db.sequelize.QueryTypes.SELECT
		});
		return orderByShopId;
	}
	catch(err){
		console.log(err);
		return null;
	}
}
exports.changeStatusOrder = async function(req){
	try{
		const orderByShopId = await Order.findOne({where :{
			order_id : req.params.order_id,
			shop_id : req.params.shop_id
		}});
		if (orderByShopId) {
			orderByShopId.status = req.body.status;
			const orders = await orderByShopId.save();
			return orders.dataValues;
		}
	}
	catch(err){
		console.log(err);
		return null;
	}
}
exports.getTotalOrderByShopId = async function(req){
	try{
		const totalOrder = await db.sequelize.query(`select count(order_id) as 'total' from shopshop.order where shop_id = ${req.params.shop_id}`,{
			type : db.sequelize.QueryTypes.SELECT
		});
		return totalOrder;
	}	
	catch(err){
		console.log(err);
		return null;
	}
}

exports.getTotalMoney = async function(req) {
	try{
		const totalMoney = await db.sequelize.query(`SELECT SUM(quantity*priceEach) as 'total' from shopshop.order o
				Inner join orderdetail ord ON o.order_id = ord.order_id
					where shop_id = ${req.params.shop_id}`,{
					type : db.sequelize.QueryTypes.SELECT	
				});
		return totalMoney;
	}
	catch(err){
		console.log(err);
		return null;
	}
}
exports.addOrder = async function (req) {
	try {
		const tmpPro = await db.sequelize.query(`select DISTRINCT shop_id from productincart inner join product ON productincart.product_id = product.product_id`,{
			type : db.sequelize.QueryTypes.SELECT
		});
		return tmpPro;
	}
	catch(err){
		console.log(err);
		return null;
	}
}
exports.getMoneyMonth = async function (req) {
	try{
		const month =  await db.sequelize.query(`SELECT SUM(quantity*priceEach) as 'total' from shopshop.order o
				Inner join orderdetail ord ON o.order_id = ord.order_id
					where shop_id = ${req.params.shop_id} and month(o.orderDate) = ${req.params.month} and year(o.orderDate) = ${req.params.year}`,{
					type : db.sequelize.QueryTypes.SELECT	
				});
		return month;
	}
	catch(err){
		console.log(err);
		return null;
	}
}
exports.getOrderMonth = async function (req) {
	try{
		const order = await db.sequelize.query(`select count(order_id) as 'total' from shopshop.order o where shop_id = ${req.params.shop_id} and month(o.orderDate) = ${req.params.month} and year(o.orderDate) = ${req.params.year}`,{
			type : db.sequelize.QueryTypes.SELECT
		});
		return order;	
	}
	catch(err) {
		console.log(err);
		return null;
	}
}
exports.getOrderDetailByShop = async function(req) {
	try{
		const orderList = await db.sequelize.query(`select * from orderdetail ord inner join product p on ord.product_id = p.product_id where order_id = ${req.params.order_id} and shop_id = ${req.params.shop_id}`,{
			type : db.sequelize.QueryTypes.SELECT
		});
		return orderList;
	}
	catch(err){
		console.log(err);
		return null;
	}
}
exports.getOrderDetailByUser = async function(req) {
	try{
		const orderList = await db.sequelize.query(`select * from orderdetail ord inner join product p on ord.product_id = p.product_id 
			inner join shopshop.order o on ord.order_id = o.order_id where o.order_id = ${req.params.order_id} and user_id = ${req.params.user_id}`,{
			type : db.sequelize.QueryTypes.SELECT
		});
		return orderList;
	}
	catch(err){
		console.log(err);
		return null;
	}
}