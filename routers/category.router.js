import express from "express";
import { getCategories ,getSingleCategory, addCategory , updateCategory , deteleCategory} from "../controllers/category.controller";
import auth from "../middleware/auth.middleware";
const categoryrouter = express.Router();

categoryrouter.get('/get-categories',auth,getCategories)
categoryrouter.get('/get-category/:category_id',auth,getSingleCategory)
categoryrouter.post('/add-category',auth,addCategory)
categoryrouter.put('/update-category/:category_id',auth,updateCategory)
categoryrouter.delete('/delete-category/:category_id',auth,deteleCategory)


export default categoryrouter