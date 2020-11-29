const bcrypt = require('bcrypt');
const {User} = require('../models/index');

exports.checkUserCredentials = async function (data) {
  const candidateUser = await user.findOne({
    where: {
      email: data.email,
    },
  });

  if (!candidateUser) {
    return false;
  }

  if (!bcrypt.compareSync(data.password, candidateUser.password)) {
    return false;
  }

  return candidateUser;
};

exports.getUserById = async(req) => {
  try{
    const userData = await User.findOne({
      where: {
        user_id: req.params.userId
      }
    });
    return userData.dataValues;
  } catch (err){
    console.log(err);
    return null;
  }
}
