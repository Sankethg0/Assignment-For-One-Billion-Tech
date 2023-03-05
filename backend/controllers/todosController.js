const todoModel = require('../models/todoModel')

module.exports.saveTodo = async (req,res) => {
    const {text} = req.body 

    if(!text){
        return res.status(422).json({error: 'Please Add Todo'})
    }
    req.user.password = undefined;                                                     //To neglect the password getting cahnged along with the mongodb

    const todo = new todoModel({
        text,
        postedBy:req.user,
    })
    todo.save().then(result=>{
        res.json({post:result})
    })
    .catch(err =>{
        console.log(err);
    })
    
}

module.exports.getTodosByUser = async (req,res) => {
    try{
        const todos = await todoModel.find({postedBy: req.params.userId})
        res.json(todos)
    }catch (error) {
        console.erroro(error)
        res.status(500).json({ message: 'Server Error' })
    }
}