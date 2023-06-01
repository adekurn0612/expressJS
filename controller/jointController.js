
// import models, {sequelize} from "../models/init-models.js";
import models, {sequelize} from "../models/init-models.js"



const findAllUserJointCustomer = async (req, res) => {
  try {
    const usersData = await models.users.findAll({
      include: [
        {
        model: models.customer,
        as: "customers",
        }
    ]
    });
    console.log(usersData)
    res.send(usersData);
    // res.json(usersData);
  } catch (e) {
    res.json(e);
  }
};

export default {
  findAllUserJointCustomer,
};
