import "dotenv/config"
import express from "express"
import router from "./routes/router.js"

const app=express()
const port = process.env.PORT || 3002

app.use(express.json()) //bisa menerimah data dari json
app.use(express.urlencoded({extended : true})) //bisa menerima data dari form


app.use(router)

// app.get("/",(req,res)=>{
//     res.send(`Selamat Belajar backEnd`)
// })

// app.get("/user", (req,res)=>{
//     res.send(`menampilkan data user`)
// })

app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
}) //membuat server menjadi listen

