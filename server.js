const express= require('express')
const app= express()
const http = require('node:http')
const port= 5500

// Call routes
const userRoute = require('./routes/users.route')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//deeclare route
app.use('/users',userRoute)

const server= http.createServer(app)

server.listen( port, ()=>{
    console.log(`App listening on port ${port}`)
})

