import { Router } from "express";


export const router = Router();

// Gets all the products available for sale
router.get("/", (req, res) => {
    res.json({"msg" : "products"})
})

// Gets the details of that specific product
router.get("/:id", () => {})

// Posts a new product addition
router.post("/", (req, res) => {

})

// Removes a product
router.delete("/", (req, res) => {
})

// Updates the details of a product
router.put("/:id", (req, res) => {

})

export default router