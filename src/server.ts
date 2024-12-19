import { Server } from "http"
import app from "./app"
import config from "./app/config"

let server: Server

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Server is live on https://localhost:${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
