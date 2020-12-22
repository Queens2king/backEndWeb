const { Model } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orderdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Orderdetail.init(
    {
      order_id :{
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      product_id : {
        type : DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceEach: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Orderdetail',
      freezeTableName: true
    },
  );
  return Orderdetail;
};