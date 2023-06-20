import cartModel from "../models/cart.model";
import productModel from "../models/product.model";
export const getCartItems = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const cartData = await cartModel.find({ userID: userID });
    if (cartData) {
      return res.status(200).json({
        data: cartData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addCartItem = async (req, res) => {
  try {
    const { userID, productID } = req.body;
    const proData = await productModel.findOne({ _id: productID });

    const existCartItem = await cartModel.findOne({
      productID: productID,
      userID: userID,
    });
    if (existCartItem) {
      let quantity = existCartItem.quantity + 1;
      const updatedItem = await cartModel.updateOne(
        { _id: existCartItem._id },
        {
          $set: {
            quantity: quantity,
          },
        }
      );
      if (updatedItem.acknowledged) {
        return res.status(200).json({
          data: updatedItem,
          message: "updated",
        });
      }
    }

    const cartData = new cartModel({
      userID: userID,
      productID: productID,
      name: proData.name,
      price: proData.price,
      quantity: 1,
      thumbnail: proData.thumbnail,
    });
    cartData.save();
    if (cartData) {
      return res.status(201).json({
        data: cartData,
        message: "Product Successfully added to Cart",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const cartID = req.params.cart_id;
    const { updatetype } = req.query;
    const cartData = await cartModel.findOne({ _id: cartID });


    let quantity = cartData.quantity;

    if (updatetype === "increment") {
      quantity += 1;
    }
    if (updatetype === "decrement") {
      quantity -= 1;
    }

    const updatedItem = await cartModel.updateOne(
      { _id: cartID },
      {
        $set: {
          quantity: quantity,
        },
      }
    );

    if(updatedItem.acknowledged){
        return res.status(200).json({
            message: "Updated",
          });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteCartItem = async (req, res) => {
    try {
      const cartID = req.params.cart_id;
      
      const deletedItem = await cartModel.deleteOne({_id:cartID})
      if(deletedItem.acknowledged){
        return res.status(200).json({
            data:deletedItem,
            message:"Cart Item Deleted Successfully"
          })
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };