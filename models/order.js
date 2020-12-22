const { Model } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{ foreignKey: 'user_id'});
      this.belongsTo(models.Shop,{ foreignKey: 'shop_id'});
    }
  }
  Order.init(
    {
      order_id :{
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      user_id : {
        type : DataTypes.BIGINT,
        allowNull: false,
      },
      shop_id : {
        type : DataTypes.BIGINT,
        allowNull: false,
      },
      orderDate: {
        type : DataTypes.DATE,
        allowNull : false,
      },
      requiredDate: {
        type : DataTypes.DATE,
        allowNull : false,
      },
      shippedDate : DataTypes.DATE,
      status: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Order',
      freezeTableName: true
    },
  );
  return Order;
};