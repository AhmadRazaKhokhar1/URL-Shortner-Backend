import express from "express";


// Environment variables
const PORT = process.env.PORT || 3000;

const app = express()

app.listen(PORT, ()=>console.log(`The Backend is live at http://localhost:${PORT}`))