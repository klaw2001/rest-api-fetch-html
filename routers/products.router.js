import express from "express";
import { getProducts , getSingleProduct, addProduct , updateProduct , deleteProduct } from "../controllers/product.controller";
import auth from "../middleware/auth.middleware";

const productRouter = express.Router();

productRouter.get('/get-products',getProducts)
productRouter.post('/add-product',addProduct)
productRouter.get('/get-single-product/:product_id',getSingleProduct)
productRouter.put('/update-product/:product_id',updateProduct)
productRouter.delete('/delete-product/:product_id',deleteProduct)

export default productRouter