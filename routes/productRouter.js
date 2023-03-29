import { Router } from "express";
import productModel from "../models/products.js";
import { requireAuth } from "../middlewares/auth.js";
import variantModel from "../models/variants.js";

export const router = Router();

// Gets all the products available for sale
router.get("/", async (req, res) => {
    let products = await productModel.find({});
    const final = products.map((val) => {
        val.variants = val.var_str;
    });
    res.json({ msg: "Products", products: final });
});

// Gets the details of that specific product
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const product = await productModel.findOne({ uid: id });
    product.variants = product.var_str;
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

// Attaches variants to a specific product
router.post("/var/:id", async (req, res) => {
    const prod_id = req.params.id;
    const { vars } = req.body;

    try {
        for (const { name, price } of vars) {
            let newVar = new variantModel({ for: prod_id, name, price });
            await newVar.save();
        }
        res.json({ msg: "Attached variations" });
    } catch (err) {
        res.status(500).json({
            msg: "Failed to attach some variations. Check the product details before you retry",
        });
    }
});

// Deletes a specific variant
router.delete("/var/:id", async (req, res) => {
    let prod_id = req.params.id;
    let name = req.body.name;
    try {
        await variantModel.deleteOne({ for: prod_id, name });
        res.json({ msg: "Deleted variation" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to delete variation" });
    }
});

// Removes a product and all the variants attached to it
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await productModel.deleteOne({ uid: id });
        await variantModel.delete({ for: id });
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
