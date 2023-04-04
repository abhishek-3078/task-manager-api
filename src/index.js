const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
const Task=require('./models/task')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')
// const { findByIdAndUpdate, findByIdAndDelete } = require('./models/user')

const app=express() 
// const port=process.env.PORT||3000  --we can also create our own env
const port=process.env.PORT


app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
const jwt=require('jsonwebtoken')

app.use(taskRouter)
app.use(userRouter)

app.listen(port,()=>{
    console.log("SERVER IS UP ON PORT "+port)
})



