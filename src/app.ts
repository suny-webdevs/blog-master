import express, { Application } from "express"
import cors from "cors"
import router from "./app/routes"
import globalErrorHandler from "./app/middlewares/globalErrorHandler"
import notFound from "./app/middlewares/notFound"
import path from "path"

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use("/api", router)

app.get("/", (req, res) => {
  // res.json({ success: true, message: "Welcome to Blog masters server!" })
  res.sendFile(path.join(__dirname, "index.html"))
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
