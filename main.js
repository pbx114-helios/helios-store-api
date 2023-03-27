import express, {json} from "express"

const app = express()
const PORT = process.env.PORT  || 3000

app.use(json())

app.get("/", (req, res) => {
    res.json({msg : "Hello World"})
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})