const orderService = require('../services/orderService');

exports.createOrder = async (req,res) => {
    const newOrder = await orderService.createOrder(req);
    if(newOrder == null)
        return {message : "Failed to create"}
    return res.json({
        message: 'Success',
        newOrder : newOrder
    });
}

exports.getOrders = async (req,res) => {
    const userOrders = await orderService.getOrders(req);
    if(userOrders == null)
        return {message : "Failed to get"}
    return res.json({
        message: 'Success',
        userOrders : userOrders
    });
}

exports.getOrderByIdUser = async (req, res) =>{
	const oderByIdUser = await orderService.getOrderByIdUser(req);
	return res.json(oderByIdUser);
}

