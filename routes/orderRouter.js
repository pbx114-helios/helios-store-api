import { Router } from "express";
import orderModel from "../models/orders.js";
import productModel from "../models/products.js";

const router = Router();

// Get all orders
router.get("/", async (req, res) => {
    const orders = await orderModel.find({});
    res.json({ msg: "Orders found", orders });
});

// Get order by id
router.get("/:id", async (req, res) => {
    const order_id = req.params.id;
    const order = await orderModel.findOne({ ref_id: order_id });
    res.json({ msg: "Order found", order });
});

// A new order
router.post("/:id", async (req, res) => {
    const prod_id = req.params.id;
    const { name, email, address, variant, description } = req.body;
    let prod = await productModel.findOne({ uid: prod_id });
    let newOrder = new orderModel({
        name,
        email,
        address,
        product: prod._id,
        variation: variant,
        description,
    });
    try {
        let saved = await newOrder.save();
        res.json({ msg: "Order recorded", order_ref: saved.ref_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to save that order", err });
    }
});

export default router;
