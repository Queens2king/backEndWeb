const orderService = require('../services/orderService');

exports.getOrderByIdUser = async (req, res) =>{
	const oderByIdUser = await orderService.getOrderByIdUser(req);
	return res.json(oderByIdUser);
}
exports.getRecentOrderByShopId = async(req, res) =>{
	const recentOrder = await orderService.getRecentOrderByShopId(req);
	return res.json(recentOrder);
}
exports.getOrderByShopId = async(req, res) =>{
	const orderByShopId = await orderService.getOrderByShopId(req);
	return res.json(orderByShopId);
}
exports.changeStatusOrder = async(req, res) =>{
	const newOrder = await orderService.changeStatusOrder(req);
	return res.json(newOrder);
}
exports.getTotalOrderByShopId = async(req, res) =>{
	const totalOrder = await orderService.getTotalOrderByShopId(req);
	return res.json(totalOrder);
}
exports.getTotalMoney = async(req, res) =>{
	const totalMoney = await orderService.getTotalMoney(req);
	return res.json(totalMoney);
}
exports.addOrder = async(req, res) =>{
	const newOrder = await orderService.addOrder(req);
	return res.json(newOrder);
}
exports.getMoneyMonth = async(req, res) =>{
	const money = await orderService.getMoneyMonth(req);
	return res.json(money);
}
exports.getOrderMonth = async(req, res) =>{
	const order = await orderService.getOrderMonth(req);
	return res.json(order);
}