import express from "express";
import { getCartItems , addCartItem , updateCartItem , deleteCartItem} from "../controllers/cart.controller";
import auth from "../middleware/auth.middleware";
const cartRouter = express.Router();

cartRouter.get("/get-cart-items/:user_id",auth,getCartItems)
cartRouter.post("/add-cart-item",auth,addCartItem)
cartRouter.put("/update-cart-item/:cart_id",auth,updateCartItem)
cartRouter.delete("/delete-cart-item/:cart_id",auth,deleteCartItem)


export default cartRouter