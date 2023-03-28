import express, { json } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import productRoutes from "./routes/productRouter.js";
import orderRoutes from "./routes/orderRouter.js";

config();
const app = express();

// Mongoose Setup
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL);
}
//
const PORT = process.env.PORT || 3000;

app.use(json());

app.get("/", (req, res) => {
    res.json({ msg: "Hello World" });
});

app.use("/buy", orderRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
