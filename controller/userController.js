import bcrypt from "bcrypt"
import models from "../models/init-models.js"
import users from "../models/users.js";
import { Sequelize } from "sequelize";
import customer from "../models/customer.js";
import {sequelize} from "../models/init-models.js"

const messageHelper = (data, statusCode, statusMessage) => {
    return {
      data: data,
      statusCode: statusCode,
      statusMessage: statusMessage
    };
  };

// const CreateUser = async(req , res)=>{
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const passHash = await bcrypt.hash(req.body.password,salt);
//         const result = await models.users.create({
//             user_name : req.body.username,
//             password: passHash,
//         });

//         res.status(202).send(result)
//     }catch(e){
//         res.status(400).send(e)
//     }
// }
  

const CreateUser = async(req , res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(req.body.password,salt);
        req.body.password = passHash;
        
        const data = `[${JSON.stringify(req.body)}]`;
        const query = `CALL  public.inserDataSatu('${data}')`;
        const result = await sequelize.query(query);

        res.send(messageHelper(result , 200, "sukses"));
    }catch(e){
        res.send(messageHelper(e.message , 400, "gagal"));
    }
}


const findAllRows = async(req, res)=>{
    try{
        const result =await models.users.findAll();
        res.json(result)
    }catch(e){
        res.json(e)
    }
}
const updateRows = async(req, res)=>{
        try{
            const result =await users.update({ user_name: "kurniawan" }, {
                where: {
                  id : 1
                }
              });
        }catch(e){
            res.json(e)
        }

}
const DeleteAllrows = async (req , res)=>{
    try{
        const result =await models.users.destroy({
            where: {
              user_name : "ade"
            }
          });
    }catch(e){
        res.json(e)
    }
}

const createNew = async(req , res) =>{
    try{

    }catch(e){

    }
}




export default{
    CreateUser,
    findAllRows,
    updateRows,
    DeleteAllrows
};

