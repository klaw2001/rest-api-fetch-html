import express from "express";
import { getsubcategory ,getSingleSubCategory, addsubcategory , updateSubCategory , deleteSubCategory} from "../controllers/subcategory.controller";
import auth from "../middleware/auth.middleware";
const subcategoryRouter = express.Router();

subcategoryRouter.get('/get-sub-category',auth,getsubcategory)
subcategoryRouter.post('/add-sub-category',auth,addsubcategory)
subcategoryRouter.get('/get-single-sub-category/:subcategory_id',auth,getSingleSubCategory)
subcategoryRouter.put('/update-sub-category/:subcategory_id',auth,updateSubCategory)
subcategoryRouter.delete('/delete-sub-category/:subcategory_id',auth,deleteSubCategory)

export default subcategoryRouter