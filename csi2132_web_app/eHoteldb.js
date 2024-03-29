import knex from 'knex'
import creds from './knexfile.cjs'
import express from 'express'


const db = knex(creds)

//db("room").select("*").then(console.log)

const app = express()
app.use(express.json())


app.get("/Hotel", async (req, res) => {
    const room = await db("Hotel").select("*")
    res.json(room)

})

app.listen(3000)





