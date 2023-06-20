import express from "express"
import { getOrders , addOrder} from "../controllers/order.controller"

const orderRouter = express.Router();

orderRouter.get('/get-orders/:user_id',getOrders)
orderRouter.post('/add-order/',addOrder)

export default orderRouter