import mongoose from "mongoose";
import productModel from "../models/products.js";
import { config } from "dotenv";

config();
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL);
}

async function populateProducts() {
    const data = [
        {
            name: "Helios racing varsity jacket",
            description: "Amazing varsity jackets just for you guys",
            price: 150,
            sizes: [38, 40, 42],
        },
        {
            name: "Helios racing t-shirt",
            description: "Amazing casual t-shirts just for you guys",
            price: 150,
            sizes: [38, 40, 42],
        },
    ];

    try {
        for (const i of data) {
            let obj = new productModel(i);
            await obj.save();
        }
    } catch (err) {
        console.error(err);
    }
}

populateProducts();
