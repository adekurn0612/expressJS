import models from "../models/init-models.js"
import productcategory from "../models/productcategory.js"
import product from "../models/product.js"
import multer from "multer"

  
  


const createProductCategory = async (req , res) =>{
    try{
        const result = await models.productcategory.create({
            name : req.body.productCategoryName,
            description : req.body.description
        })
        res.status(202).send(result)
    }catch(e){
        res.status(400).send(e)
    }
  }

  const createProduct = async (req, res) => {
    try {
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./image");
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname +
              "-" +
              uniqueSuffix +
              "." +
              file.originalname.split(".").pop()
          );
        },
      });
  
      const upload = multer({
        storage: storage,
        fileFilter: function (req, file, cb) {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error("Only image files are allowed!"));
          }
          cb(null, true);
        },
      }).single("image");
      upload(req, res, async function (error) {
        if (error instanceof multer.MulterError) {
          return res.status(500).json({ message: "Error upload gambar" });
        }
        const data = await models.product.create({
          name: req.body.name,
          description: req.body.description,
          categoryid: parseInt(req.body.productCategoryId),
          price: parseInt(req.body.price),
          image: req.file.filename,
        });
  
        let success = {
          message: "Data produk berhasil ditambahkan",
          status: "202",
          result: data,
        };
  
        res.status(202).send(success);
      });
    } catch (error) {
      res.send(error.message);
    }
  };

  const updatePC = async (req, res) => {
    try {
      const project = await models.product_category.findByPk(req.params.id);
      if (project === null) {
        throw new Error("Not found!");
      }
      // console.log(project);
      const result = await models.product_category.update(
        {
          name: req.body.name,
          description: req.body.description,
          // updateat: new Date(),
        },
        {
          where: {
            id: project.id,
          },
        }
      );
      res.send(messageHelper(req.body, 200, "sukses"));
    } catch (err) {
      res.send(messageHelper(err.message, 400, "coba lagi"));
    }
  };



  export default{
    createProductCategory,
    createProduct
  };