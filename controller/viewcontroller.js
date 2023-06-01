import models ,{sequelize} from "../models/init-models.js";

const messageHelper = (data, statusCode, statusMessage) => {
    return {
      data: data,
      statusCode: statusCode,
      statusMessage: statusMessage
    };
  };

const view_cs = async(req , res)=>{
    try {
        const query = `SELECT * FROM view_cs;`;
        const result = await sequelize.query(query);

        res.send(messageHelper(result , 200, "sukses"));
    }catch(e){
        res.send(messageHelper(e.message , 400, "gagal"));
    }
}

export default{
    view_cs
}