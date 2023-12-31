import subcategoryModel from "../models/subcategory.model";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = "./uploads";
      const subfolder = "sub-category";
  
      // Create "uploads" folder if it doesn't exist
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
  
      // Create subfolder inside "uploads"
      const subfolderPath = path.join(uploadPath, subfolder);
      if (!fs.existsSync(subfolderPath)) {
        fs.mkdirSync(subfolderPath);
      }
  
      cb(null, subfolderPath);
    },
    filename: function (req, file, cb) {
      const name = file.originalname; // abc.png
      const ext = path.extname(name); // .png
      const nameArr = name.split("."); // [abc,png]
      nameArr.pop();
      const fname = nameArr.join("."); //abc
      const fullname = fname + "-" + Date.now() + ext; // abc-12345.png
      cb(null, fullname);
    },
  });

 const upload = multer({ storage: storage });

export const getsubcategory = async (req,res)=>{
    try {
        const subcategoryData = await subcategoryModel.aggregate([
            {
                $lookup:{
                    from:"categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categories",
                },
            },
            {$unwind:"$categories"},
        ]);
        
        if(subcategoryData){
            return res.status(200).json({
                data:subcategoryData,
                message:"Success"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
    
}

export const getSingleSubCategory = async(req,res)=>{
    try {
        const subcategoryID = req.params.subcategory_id;
        const categoryData = await subcategoryModel.findOne({ _id: subcategoryID });
        
        if (categoryData) {
          return res.status(200).json({
            data: categoryData,
            message: "Success"
          });
        } 
      } catch (error) {
        return res.status(500).json({
          message: error.message
        });
      }
}

export const addsubcategory = (req,res) =>{
    try {
        const uploadImage = upload.single("image");
        uploadImage(req, res, function (err) {
          if (err) return res.status(400).json({ message: err.message });
    
          const { name , category} = req.body;
          let image = null;
          if (req.file !== undefined) {
            image = req.file.filename;
          }
    
          const subcategoryData = new subcategoryModel({
            name: name,
            category:category,
            image: image,
          });
          subcategoryData.save();
          if (subcategoryData) {
            return res.status(201).json({
              data: subcategoryData,
              message: "Category Added Successfully",
            });
          }
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
}

export const updateSubCategory = async (req,res)=>{
    try {
        const uploadImage = upload.single("image");
        uploadImage(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const subcategoryID = req.params.subcategory_id;
      const { name , category } = req.body;

      const subcategoryData = await subcategoryModel.findOne({ _id: subcategoryID });
      let image = subcategoryData.image;
      if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./uploads/sub-category/" + subcategoryData.image)) {
          fs.unlinkSync("./uploads/sub-category/" + subcategoryData.image);
        }
      }

      const updatedData = await subcategoryModel.updateOne(
        { _id: subcategoryID },
        {
          $set: {
            name: name,
            category:category,
            image: image,
          },
        }
      );

      if(updatedData.acknowledged){
        return res.status(200).json({
            message: "Updated",
          });
      }
    });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        }); 
    }
}

export const deleteSubCategory = async (req,res) =>{
    const subcategoryID = req.params.subcategory_id;
    const subcategory = await subcategoryModel.findOne({_id:subcategoryID})

    let image = subcategory.image;

    if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./uploads/sub-category/" + subcategory.image)) {
          fs.unlinkSync("./uploads/sub-category/" + subcategory.image);
        }
      }

      const deleteCat = await subcategoryModel.deleteOne(subcategory)
      if(deleteCat.acknowledged){
        return res.status(200).json({
            message: "Category Deleted!",
          });
      }
}