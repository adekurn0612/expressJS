import { Router } from "express";
import userController from "../controller/userController.js";
import productController from "../controller/productController.js";
import orderController from "../controller/orderController.js";
import jointController from "../controller/jointController.js";
import viewcontroller from "../controller/viewcontroller.js";
import loginController from "../controller/loginController.js"

const router=Router()

router.get("/", (req,res)=>{
    res.send(`selamat belajar backend`)
})

// router.get("/user",(req,res)=>{
//     res.send(`menampilkan data user`)
// })

router.post("/user", userController.CreateUser);
router.get("/user" , loginController.checkToken, userController.findAllRows);
router.put("/user", userController.updateRows);
router.delete("/user", userController.DeleteAllrows);
router.post("/productcategory", productController.createProductCategory);
router.post("/product", productController.createProduct);
router.post("/orders", orderController.createOrder);
router.get("/jointall", jointController.findAllUserJointCustomer);
router.get("/viewcs" , viewcontroller.view_cs);
router.get("/login", loginController.checkUser)


export default router;