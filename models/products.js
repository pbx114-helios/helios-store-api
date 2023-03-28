import { model, Schema, SchemaTypes } from "mongoose";

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    entryUser: { type: SchemaTypes.ObjectId, ref: "order", required: true },
});

const productModel = model("product", productSchema);
export default productModel;
