

const express = require('express')
const app = express()


app.get('/', function (req, res) {
  res.send('Hello World')
})




app.listen(5000,()=>{console.log("Listen at the port: 5000");})