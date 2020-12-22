const db = require('../models/index');
const { Order } = require('../models/index');
const { Orderdetail} = require('../models/index');

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