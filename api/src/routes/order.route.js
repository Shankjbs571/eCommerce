import express from "express";
import {
  placeOrder,
  getAllOrders,
  cancelOrder,
  getAllOrdersAdmin,
} from "../controller/order.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";
import { getTotalOnlineSale } from "../controller/getSales.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const OrderRouter = express.Router();

OrderRouter.route("/placeOrder").post(verifyToken, placeOrder);
OrderRouter.route("/cancelOrder").get(verifyToken, cancelOrder);
OrderRouter.route("/getAllOrders").get(verifyToken, getAllOrders);
OrderRouter.route("/getAllOrdersAdmin").get(verifyAdmin, getAllOrdersAdmin);
OrderRouter.route("/SalesData").get(verifyToken,getTotalOnlineSale );
export default OrderRouter;
