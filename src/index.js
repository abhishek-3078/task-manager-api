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

// app.use((req,res,next)=>{
//     if(req.method==="GET"){
//         return res.send('GET request are disabled')
//     }else{
//         next()
//     }
// })
// app.use((req,res,next)=>{
//     res.status(503).send('Site is Currently down. Check Back Soon')
// })
//without middleware: new request->run route handler
//with middleware: new request-> do something-> run route handler
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
const jwt=require('jsonwebtoken')

app.use(taskRouter)
app.use(userRouter)


app.get('/test',(req,res)=>{

     const data={
        name:"abhihsek",
        age:19,
         f(){
            console.log("hello world from function")
            return 5
        }
    }
    console.log(data.f())
    res.send("hello")
})
const errorMiddleware=(req,res,next)=>{
    throw new Error("from my middleware")
}

app.listen(port,()=>{
    console.log("SERVER IS UP ON PORT "+port)
})



