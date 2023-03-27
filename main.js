import express, {json} from "express"
import { config } from "dotenv"
import productRoutes from "./routes/productRouter.js"
import orderRoutes from "./routes/orderRouter.js"


config()
const app = express()
const PORT = process.env.PORT  || 3000

app.use(json())

app.get("/", (req, res) => {
    res.json({msg : "Hello World"})
})

app.use("/buy", orderRoutes)
app.use("/products", productRoutes)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})