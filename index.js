import dotenv from "dotenv"
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routers/user.router";
import categoryrouter from "./routers/category.router"
import subcategoryRouter from "./routers/subcategory.router";
import productRouter from "./routers/products.router";
import cartRouter from "./routers/cart.router";
import orderRouter from "./routers/order.router";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(express.static(__dirname))

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));



app.listen(PORT,()=>{
    console.log("Your server running on http://localhost:" + PORT)
})

mongoose
.connect("mongodb://127.0.0.1:27017/" + process.env.DB_NAME)
.then(()=> console.log("Connected!"))

app.use('/users',userRouter)
app.use('/category',categoryrouter)
app.use('/sub-category',subcategoryRouter)
app.use('/products',productRouter)
app.use('/cart',cartRouter)
app.use('/orders',orderRouter)

