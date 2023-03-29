import { model, Schema, SchemaTypes } from "mongoose";

const variantSchema = new Schema({
    name: String,
    price: Number,
    for: String,
});

const variantModel = model("variant", variantSchema);

export default variantModel;
