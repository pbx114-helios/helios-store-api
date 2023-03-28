import { Router } from "express";
import productModel from "../models/products.js";
import { requireAuth } from "../middlewares/auth.js";

export const router = Router();

// Gets all the products available for sale
router.get("/", async (req, res) => {
    const products = await productModel.find({});
    res.json({ msg: "Products", products });
});

// Gets the details of that specific product
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productModel.findOne({ uid: id });
    res.json({ msg: "Product", product });
});

// Posts a new product addition
router.post("/", async (req, res) => {
    const prodInfo = req.body.productInfo;

    let product = new productModel(prodInfo);
    try {
        await product.save();
        res.status(200).json({ msg: "Product added" });
    } catch (err) {
        console.log(err);
        res.stauts(500).json({ msg: "Failed to add product" });
    }
});

// Removes a product
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await productModel.deleteOne({ uid: id });
        res.json({ msg: "Product deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Failed to delete product", err });
    }
});

// Updates the details of a product
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newInfo = req.body.updatedInfo;
    try {
        await productModel.updateOne({ uid: id }, newInfo);
        res.json({ msg: "Updated product information" });
    } catch (err) {
        res.json({ msg: "Failed to update product information", err });
    }
});

export default router;
