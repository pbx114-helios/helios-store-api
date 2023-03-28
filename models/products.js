import { model, Schema, SchemaTypes } from "mongoose";
import { nanoid } from "nanoid";

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    uid: {
        type: String,
        default: await nanoid(10),
    },
    // entryUser: { type: SchemaTypes.ObjectId, ref: "order", required: true },
});

const productModel = model("product", productSchema);
export default productModel;
