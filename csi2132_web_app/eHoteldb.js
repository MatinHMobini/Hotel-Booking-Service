import knex from "knex"
import creds from "./knexfile.cjs";
import express from "express";
import cors from "cors"; // Import the cors middleware

const db = knex(creds)

const app = express()
app.use(express.json())

// Enable CORS for all routes
app.use(cors());

app.get("/hotel", async (req, res) => {
  const hotel = await db("hotel").select("*")
  res.json(hotel)
})

app.listen(3000)


//db("hotel_chain").select("*").then(console.log)
