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

exports.findUser = async function(data){
	try{
		const user = await User.findOne({ where: { user_id: data.user_id } });
		if(user === null)
		{
			console.log("you are anonymous");
			return null;
		}
    let dataUser = user.dataValues;
    dataUser.password = null;
    if(dataUser.birthday){
      dataUser.birthday = dataUser.birthday.toLocaleString().split(',')[0];
    }
		return dataUser;
	} catch(err){
	console.log(err);
	return null;
	}
	return null;
}

exports.updateProfile = async function(req,res){
  let result = {
    message:'',
    user:{}
  }

  try{
    const updatedUser = await User.update(
      {
        name: req.body.name
      },
      {
        returning: true,
        where: {user_id: res.locals.user.user_id}
      }
    );
    result.message = 'Success';
    result.user = {...updatedUser.dataValues}
    return result;
  } catch (err){
    console.log(err);
    return result;
  }
}
