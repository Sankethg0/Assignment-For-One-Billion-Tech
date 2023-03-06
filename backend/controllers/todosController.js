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

module.exports.getTodosCurrentUser = async (req,res) => {
    todoModel.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports.deleteTodo = async (req,res) =>{
    todoModel.findOne({_id:req.param.todosId})
    .populate("postedBy","_id")
    .exec((err,post) => {
        if(err || post) {
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result => {
                res.json(result)
            }).catch(err => {
                console.log(err)
            })
        }
    })
}