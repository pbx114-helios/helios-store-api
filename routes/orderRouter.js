import { Router } from "express";
import orderModel from "../models/orders.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

// Get all orders
router.get("/", requireAuth("Vendor"), async (req, res) => {
    const orders = await orderModel.find({});
    res.json({ msg: "Orders found", orders });
});

// Get order by id
router.get("/:id", requireAuth("Vendor"), async (req, res) => {
    const order_id = req.params.id;
    const order = await orderModel.findOne({ ref_id: order_id });
    res.json({ msg: "Order found", order });
});

// A new order
router.post("/", async (req, res) => {
    const { name, email, address, products, description } = req.body;
    let newOrder = new orderModel({
        name,
        email,
        address,
        products,
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

// Delete an order by id
router.delete("/:id", requireAuth("Vendor"), async (req, res) => {
    const order_id = req.params.id;
    try {
        await orderModel.deleteOne({ ref_id: order_id });
        res.json({ msg: "Order deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Failed to delete order", err });
    }
});

export default router;
