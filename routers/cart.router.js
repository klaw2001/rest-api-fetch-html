import express from "express";
import { getCartItems , addCartItem , updateCartItem , deleteCartItem} from "../controllers/cart.controller";
import auth from "../middleware/auth.middleware";
const cartRouter = express.Router();

cartRouter.get("/get-cart-items/:user_id",getCartItems)
cartRouter.post("/add-cart-item",addCartItem)
cartRouter.put("/update-cart-item/:cart_id",updateCartItem)
cartRouter.delete("/delete-cart-item/:cart_id",deleteCartItem)


export default cartRouter