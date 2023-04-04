const mongoose=require('mongoose')
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true
})
// const User=mongoose.model('User',{
//     name:{
//         type:String,
//         trim:true,
//         required:true
//     },
//     age:{
//         type:Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new Error('Age must be positive number')
//             }
//         }
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         minLength:6,
//         validate(value){
//             // if(value.length<6){
//             //     throw new Error('password length must be greater than 6')
//             // }
//             if(value.toLowerCase().includes("password")){
//                 throw new Error("password cannot contain password")
//             }
//         }
//     }
    
// })

// const task=new Task({
//     description:'  study',
//     //completed:false
// })


// const me=new User({
//     name:'  ABhishek',
//     age:19,
//     email:"ABHIUPPER_CASE@gmail.com",
//     password:"adfjfadksf"
    
// })
//saving int mongodb
// me.save().then((me)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error',error)
// })
// task.save().then((task)=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log('Error:  ',error)
// })