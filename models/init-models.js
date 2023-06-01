import {Sequelize} from "sequelize";
const sequelize= new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect:"postgres",
      pool:{
        max:5,
        min:0,
        acquire:3000,
        idle:1000,
      },
    }

);
import _sequelize from 'sequelize';
const DataTypes = _sequelize.DataTypes;
import _customer from  "./customer.js";
import _orderdetail from  "./orderdetail.js";
import _orders from  "./orders.js";
import _product from  "./product.js";
import _productcategory from  "./productcategory.js";
import _users from  "./users.js";

function initModels(sequelize) {
  const customer = _customer.init(sequelize, DataTypes);
  const orderdetail = _orderdetail.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const product = _product.init(sequelize, DataTypes);
  const productcategory = _productcategory.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  orderdetail.belongsTo(orders, { as: "order", foreignKey: "orderid"});
  orders.hasMany(orderdetail, { as: "orderdetails", foreignKey: "orderid"});
  orderdetail.belongsTo(product, { as: "product", foreignKey: "productid"});
  product.hasMany(orderdetail, { as: "orderdetails", foreignKey: "productid"});
  product.belongsTo(productcategory, { as: "category", foreignKey: "categoryid"});
  productcategory.hasMany(product, { as: "products", foreignKey: "categoryid"});
  customer.belongsTo(users, { as: "user", foreignKey: "userid"});
  users.hasMany(customer, { as: "customers", foreignKey: "userid"});
  orders.belongsTo(users, { as: "user", foreignKey: "userid"});
  users.hasMany(orders, { as: "orders", foreignKey: "userid"});

  return {
    customer,
    orderdetail,
    orders,
    product,
    productcategory,
    users,
  };
}

const models = initModels(sequelize)
export default models;
export  {sequelize};
