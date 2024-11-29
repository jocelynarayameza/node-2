const express = require("express")
const app = express()
const fs = require("fs")
const cors = require('cors');

app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
        res.sendFile(__dirname + "/index.html")
});


app.listen(3001,console.log("Servidor ejecutandose"))