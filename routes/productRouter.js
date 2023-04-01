import { Router } from "express";
import productModel from "../models/products.js";
import { requireAuth } from "../middlewares/auth.js";
import variantModel from "../models/variants.js";

export const router = Router();

// Gets all the products available for sale
router.get("/", async (req, res) => {
    try {
        let products = await productModel.find({});
        let new_products = await Promise.all(
            products.map(async (val) => {
                let newVal = val.toObject();
                newVal.variants = await val.var_str;
                return newVal;
            })
        );
        res.json({ msg: "Products", products: new_products });
    } catch (err) {
        res.status(500).json({ msg: "Oops. Something went wrong!" });
    }
});

// Gets the details of that specific product
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try { 

        let product = await productModel.findOne({ uid: id });
        if (!product) {
            res.json({ msg: "Product not found" });
            return
        }
        let variants = await product.var_str;
        res.json({ msg: "Product", product, variants });
    }catch(err) {
        res.status(500).json({ msg: "Oops. Something went wrong!" });
    }
});

// Posts a new product addition
router.post("/", requireAuth(), async (req, res) => {
    const {name, description, price} = req.body;
    let product = new productModel({name, description, price});
    try {
        await product.save();
        res.status(200).json({ msg: "Product added" });
    } catch (err) {
        console.log(err);
        res.stauts(500).json({ msg: "Failed to add product" });
    }
});

// Attaches variants to a specific product
router.post("/var/:id", requireAuth(), async (req, res) => {
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
router.delete("/var/:id", requireAuth(), async (req, res) => {
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
router.delete("/:id", requireAuth(), async (req, res) => {
    const id = req.params.id;
    try {
        await productModel.deleteOne({ uid: id });
        await variantModel.deleteMany({ for: id });
        res.json({ msg: "Product deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Failed to delete product", err });
    }
});

// Updates the details of a product
router.put("/:id", requireAuth(), async (req, res) => {
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
