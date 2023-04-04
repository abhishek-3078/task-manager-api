const mongoose=require('mongoose')

const validator=require('validator')

mongoose.set('strictQuery', true)

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true
    
})

const name=mongoose.model('NAME',{
    name:{
        type:String,
        required:true
    }
})

const me={
    _id:new mongoose.Types.ObjectId(),
    name:"ABhishek Kumar"
}
console.log(me)
me.save().then((me)=>{
    console.log(me);

}).catch((e)=>{
    console.log(e)
})