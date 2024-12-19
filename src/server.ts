import { Server } from "http"
import app from "./app"
import config from "./app/config"
import mongoose from "mongoose"

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    server = app.listen(config.port, () => {
      console.log(`Server is live on https://localhost:${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()

process.on("unhandledRejection", () => {
  if (server) {
    server.close(process.exit(1))
  }
  process.exit(1)
})
process.on("uncaughtException", () => process.exit(1))
