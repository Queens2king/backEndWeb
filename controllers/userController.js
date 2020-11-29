const userService = require('../services/userService');


exports.getUserById = async(req,res) => {
    const user = await userService.getUserById(req);
    res.json(user);
}