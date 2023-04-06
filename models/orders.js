import { model, Schema, SchemaTypes } from "mongoose";
import { nanoid } from "nanoid";
import { validate } from "email-validator";

const orderSchema = new Schema({
    name: { type: String, required: [true, "User's name required"] },
    email: {
        type: String,
        validate: [validate, "Please provide a valid email id"],
    },
    address: { type: String, required: [true, "Please provide an address"] },
    products: [{ product_id: String, variation: String, qty: Number, name : String }],
    ref_id: { type: String, default: await nanoid(12) },
    description: String,
});

const orderModel = model("order", orderSchema);
export default orderModel;
