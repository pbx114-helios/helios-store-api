import { Schema, SchemaTypes } from "mongoose";
import { nanoid } from "nanoid";
import isEmail from "validator/lib/isemail";

const orderSchema = new Schema({
    name: { type: String, required: [true, "User's name required"] },
    email: {
        type: String,
        validate: [isEmail, "Please provide a valid email id"],
    },
    address: { type: String, required: [true, "Please provide an address"] },
    product_id: String,
    ref_id: { default: await nanoid(12) },
    variation: String,
    description: String,
});

const orderModel = model("order", orderSchema);
export default orderModel;
