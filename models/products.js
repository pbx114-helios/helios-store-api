import { model, Schema, SchemaTypes } from "mongoose";
import { nanoid } from "nanoid";
import variantModel from "./variants";

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

productSchema.virtual("var_str").get(async function () {
    let vars = [];
    let foundVariants = await variantModel.find({ for: this.uid });
    for (const res of foundVariants) {
        vars.push(res.name);
    }
    return vars;
});

const productModel = model("product", productSchema);
export default productModel;
