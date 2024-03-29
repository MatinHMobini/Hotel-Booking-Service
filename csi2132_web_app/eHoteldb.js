import knex from "knex"
import creds from "./knexfile.cjs";
import express from "express";


const db = knex(creds)

db("hotel").select("*").first().then(console.log)

const app = express()
app.use(express.json())


app.get("/hotel", async (req, res) => {
    const hotel = await db("hotel").select("*")
    res(hotel)

})

app.listen(3000)





