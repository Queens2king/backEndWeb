const db = require('../models/index');
const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const moment = require('moment');

exports.register = async(req) => {

    let result = {
        message:'',
        user:{}
    }
    const checkemail = await db.sequelize.query(`Select* from user
    where user.email = '${req.body.email}'`,{
        type: db.sequelize.QueryTypes.SELECT
    });
    if (checkemail.length != 0){
        result.message = "Email is used !";
        return result;
    }
    let { password } = req.body;
    password = await bcrypt.hash(password, 10);
    // CREATE USER
    try{
        const newUser = await User.create({
            ...req.body,
            password: password,
            createdAt: moment(),
            updatedAt: moment()
        });
        result.user = {
            ...newUser.dataValues,
            password: ''
        }
        return result;
    } catch(err){
        console.log(err);
        result.message = "Failed to create user";
        return result;
    }
    return null;
}

// where user.email = ${req.body.email}