const Task=require('../models/task')
const express=require('express')
const auth=require('../middleware/auth')
const router=new express.Router()
//GET /tasks?completed=true
//pagination  GET/tasks?limit=10&skip=0
//sort-> GET /task?sortBy=createdAt:desc   -1 for desx
router.get('/tasks',auth,async(req,res)=>{

    const sort={}
    const match={}
    if(req.query.completed){
        match.completed=req.query.completed==='true'
    } 
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'?-1:1
    }
    try{
        // const tasks=await Task.find({owner:req.user._id})
        // res.send(tasks)
        await req.user.populate({
            path:'tasks',
            match, //shorthand for match:match
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip), //if no limit/skip is provided then it eill be ignored
                // sort:{
                //     completed:-1
                // }
                sort:sort
            }
        })
        res.send(req.user.tasks)
        // res.send(req.user.tasks.sort((a,b)=>b.createdAt-a.createdAt))
    }
    catch(e){
        res.status(400).send(e)
    }
})


router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id

    try{
        const task=await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
//     Task.findById(_id).then((task)=>{
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e)=>{
//         res.status(500).send(e)
// })
})
router.post('/tasks',auth,async(req,res)=>{
    console.log(req.body)
    const task=new Task({
        ...req.body, //es6 method to copy a object as it is
        owner:req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


router.patch('/tasks/:id',auth,async(req,res)=>{
    console.log(req.params)
    const updates=Object.keys(req.body)
    const allowedUpdates=["description","completed"]
    isValidOperators=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperators){
        return res.status(400).send({"error":"invalid updates"})
    }
    try{
        // const task=await Task.findById(req.params.id)
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
        
        // const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        console.log(task)
        await task.save()
        res.send(task)
    }  catch(e){
        res.status(500).send(e)
    }


    }
)

router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        // const task= await Task.findByIdAndDelete(req.params.id)
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        // console.log(task)
        
        if(!task){
            return res.status(404).send()
        }
        
        res.send(task)
    
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports=router