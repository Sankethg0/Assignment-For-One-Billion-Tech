const userModel = require('../models/userModel')
const bcrypt = require ('bcrypt')

module.exports.signupUser = async (req,res) => {
    const {name,email,password} = req.body 

    if(!name || !password || !email ){
        return res.status(422).json({error: 'Please Add all the Feilds'})
    }
    userModel.findOne({email:email})
    .then((savedUser) =>{
        if(savedUser){
            return res.status(422).json({error:'This user already exists!'})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword => {
            const user = new userModel({
                email,
                name,
                password:hashedpassword,
            })
            user.save()
            .then(user =>{
                res.json({message:"User saved successfully"})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch( err => {
            console.log(err)
        })
    })
    
}

module.exports.loginUser = async (req,res) =>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({
            error: "Provide the login details"
        })
    }
    userModel.findOne({
        email:email
    }).then(
        savedUser => {
            if(!savedUser){
                return res.status(422).json({
                    error:"Invalid Email or Password!"
                })
            }
            bcrypt.compare(password,savedUser.password)
            .then(doMatch => {
                if(doMatch){
                    res.json({message: "Successfully Signed In"})
                }
                else{
                    res.status(422).json({
                        error:"Invalid Email or Password"
                    })
                }
            }).catch(err =>{
                console.log(err)
            })
        }
    )
}
