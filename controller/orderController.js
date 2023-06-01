import models, { sequelize } from '../models/init-models.js'
import orderdetail from '../models/orderdetail.js'



//Dengan store_procedure
// const createOrder = async (req, res) => {
//     try {
//       const user_id = parseInt(req.body.userid);
//       const user = await models.users.findByPk(user_id);
//       console.log(user);
//       if (!user) {
//         throw new Error("User Id tidak ditemukan");
//       }
  
//       const order_detail = req.body.order_detail;
//       const total_quantity = order_detail.reduce((acc, curr) => {
//         return acc + curr.quantity;
//       }, 0);
  
//       let total_price = 0;
//       for (let i = 0; i < order_detail.length; i++) {
//         let temp_price = order_detail[i].price * order_detail[i].quantity;
//         total_price += temp_price;
//       }
  
//       const order_detail_without_price = order_detail.map(
//         ({ productid, quantity }) => ({
//           productid,
//           quantity,
//         })
//       );
  
//       const result = await sequelize.query(
//         "CALL create_order(:user_id, :total_quantity, :total_price, :order_detail)",
//         {
//           replacements: {
//             userid: userid,
//             totalproduct: totalproduct,
//             totalprice: total_price,
//             orderdetail: JSON.stringify(order_detail_without_price),
//           },
//         }
//       );
  
//       res.json({
//         message: "Create Completed",
//         Body: req.body,
//       });
//     } catch (err) {
//       res.status(400).send(err.message);
//     }
//   };

// const createOrder = async(req,res) => {
//     try {
//         const totalproductt = req.body.reduce((prev,curr) => prev + curr.quantity,0)
//         let arr = []
//         let arrr = []

//         for(let i in req.body){
//             arr.push({
//                 userid: req.body[i].userid,
//                 totalprice: req.body[i].price*req.body[i].quantity,
//                 totalproduct: totalproductt
//             })
//             arrr.push({
//                 userid: req.body[i].userid,
//                 totalproduct: totalproductt,
//                 totalprice: req.body[i].price*req.body[i].quantity
//             })
//             const data1 = `[${JSON.stringify(arr[i])}]`;
//             const data2 = `[${JSON.stringify(arrr[i])}]`;
//             await sequelize.query(`CALL insertOrderAndOrderDetails('${data1}','${data1}')`);
//             res.send('berhasil')
            
//         }
       
        
//     } catch (error) {
//         res.send(error.message)
//     }
// }
// export default {
//     createOrder
// }

const createOrder =async (req,res) => {
    try {
        const orderdetail = req.body.orderdetail
        let totalquantity = 0
        for (let i = 0; i < orderdetail.length; i++) {
          totalquantity +=  orderdetail[i].quantity           
        }
        let totalprice = 0
        for (let i = 0; i < orderdetail.length; i++) {
             let temp_price = orderdetail[i].price * orderdetail[i].quantity
             totalprice += temp_price
        }
        const result_order_detail = orderdetail.map(
         ({ productid, quantity }) => ({
           productid,
           quantity,
         })
       );
        const data = await sequelize.query(
         "CALL orders(:userid, :totalproduct, :totalprice, :orderdetail)",{
             replacements: {
                 userid: req.body.userid,
                 totalproduct: totalquantity,
                 totalprice: totalprice,
                 orderdetail: JSON.stringify(result_order_detail)
             }
         } 
        )
        console.log(data)
         res.json({
             message: "success",
             data
         })
     } catch (error) {
         res.status(500).send(error.message)
     }
 }


export default {
    createOrder
}
