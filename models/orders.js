import { Schema, SchemaTypes } from "mongoose";

const orderSchema = new Schema({
    product: { type: SchemaTypes.ObjectId, ref: "product", required: true },
    description: String,
});

const orderModel = model("order", orderSchema);
export default orderModel;
