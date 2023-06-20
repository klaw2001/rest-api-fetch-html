import orderModel from "../models/order.model";
import userModel from "../models/user.model";
import productModel from "../models/product.model";


export const getOrders = async (req,res) =>{
    try {
        const userID = req.params.user_id;
    const orderData = await orderModel.find({ userID: userID });
    if (orderData) {
      return res.status(200).json({
        data: orderData,
        message: "Success",
      });
    }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          });
    }
}

export const addOrder = async(req,res) =>{
    try {
        const { userID, productID } = req.body;
        const proData = await productModel.findOne({ _id: productID });

        const orderData = new orderModel({
            userID: userID,
            productID: productID,
            name: proData.name,
            price: proData.price,
            quantity: 1,
            thumbnail: proData.thumbnail,
          });
          orderData.save();
          if (orderData) {
            return res.status(201).json({
              data: orderData,
              message: "Product Ordered",
            });
          }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
          }); 
    }
}