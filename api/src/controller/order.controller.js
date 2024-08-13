import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import OrderItem from "../models/orderItems.js";
import CartItem from "../models/cartItem.model.js";
import Product from "../models/product.model.js";
import { handleAllTotalOnlineSales, TotalAllupdateSalesData } from "./sale.controller.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";

const placeOrder = asyncHandler(async (req, res) => {
  const { id } = req.user;

  // Fetch the user's cart and populate cartItems
  const cart = await Cart.findOne({ user: id }).populate("cartItems");

  if (!cart) {
    return res.status(404).json(new ApiResponse(404, "Cart not found", null));
  }

  try {
    const orderItems = [];
    let purchaseRate = 0;

    // Loop through each cartItem and create corresponding orderItems
    for (const cartItem of cart.cartItems) {
      const product = await Product.findById(cartItem.product);
      const orderItem = new OrderItem({
        product: cartItem.product,
        quantity: cartItem.quantity,
        price: cartItem.price,
        discountedPrice: cartItem.discountedPrice,
        userId: id,
      });
      await orderItem.save();
      orderItems.push(orderItem._id);
      purchaseRate += product.purchaseRate;
    }

    // Create the order
    const order = new Order({
      user: id,
      orderItems: orderItems,
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      totalItem: cart.totalItem,
      discount: cart.discount,
      GST: 0,
      shippingAddress: req.body.shippingAddress,
      paymentDetails: req.body.paymentDetails,
    });

    const OrderSale = {
      totalPrice: cart.totalPrice,
      totalDiscountedPrice: cart.totalDiscountedPrice,
      GST: 0,
      discount: cart.discount,
      totalItem: cart.totalItem,
      totalPurchaseRate: purchaseRate,
      totalProfit: cart.totalDiscountedPrice - purchaseRate,
      finalPriceWithGST: cart.totalDiscountedPrice,
    };

    await order.save();
    await handleAllTotalOnlineSales(OrderSale);

    // Delete cartItems after the order is placed
    await CartItem.deleteMany({
      _id: { $in: cart.cartItems.map((item) => item._id) },
    });

    // Delete the cart after placing the order
    await Cart.findByIdAndDelete(cart._id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Order placed successfully", order));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse(500, "Error placing order", error.message));
  }
});


const getAllOrders = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({ user: id }).populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "products",
      },
    });

    if (!orders) {
      return res
        .status(404)
        .json(new ApiResponse(404, "No orders found", null));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Orders fetched successfully", orders));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse(500, "Error fetching orders", error.message));
  }
});

const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json(new ApiResponse(404, "Order not found", null));
  }

  if (order.orderStatus === "CANCELLED") {
    return res
      .status(400)
      .json(new ApiResponse(400, "Order is already cancelled", null));
  }
 // Creating a plain object copy of the order
  const cancelFields = {
      totalPrice: 0,
      totalDiscountedPrice: 0,
      GST: 0,
      discount: 0,
      totalItem: 0,
      totalPurchaseRate: 0,
      totalProfit: 0,
      finalPriceWithGST: 0,
  };  
  const OrderSale = {
    totalPrice: order.totalPrice,
    totalDiscountedPrice: order.totalDiscountedPrice,
    GST: order.GST,
    discount: order.discount,
    totalItem: order.totalItem,
    totalPurchaseRate: purchaseRate,
    totalProfit: order.totalPrice,
    finalPriceWithGST: order.totalDiscountedPrice,
};
await TotalAllupdateSalesData(OrderSale,cancelFields);
  order.totalPrice = cancelFields.totalPrice;
  order.totalDiscountedPrice = cancelFields.totalDiscountedPrice;
  order.GST = cancelFields.GST;
  order.discount = cancelFields.discount;
  order.totalItem = cancelFields.totalItem;
  order.totalPurchaseRate = cancelFields.totalPurchaseRate;
  order.totalProfit = cancelFields.totalProfit;
  await order.save();

  for (const item of order.orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
          product.quantity += item.quantity;
          await product.save();
      }
  }

  order.orderStatus = "CANCELLED";
  await order.save();

  // Optional: Handle any related operations like refunding the payment, updating stock, or notifying the user
  // Example: Refund the payment
  // if (order.paymentDetails.paymentStatus === "PAID") {
  //     await refundPayment(order.paymentDetails.transactionId);
  // }

  return res
    .status(200)
    .json(new ApiResponse(200, "Order cancelled successfully", order));
});

// Get All Orders for Admin
const getAllOrdersAdmin = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          model: "products", // Ensure this matches your Product model name
        },
      })
      .populate("user");

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, "No orders found", null));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Orders fetched successfully", orders));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse(500, "Error fetching orders", error.message));
  }
});

export { cancelOrder, placeOrder, getAllOrders, getAllOrdersAdmin };
