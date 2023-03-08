const userModel = require('../models/userModel')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

require ('dotenv').config()
const jwt_secret = process.env.JWT_SECRET

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
                    const token = jwt.sign({_id:savedUser._id},jwt_secret)
                    const {_id,name,email} = savedUser
                    res.json({token,user:{_id,name,email}})
                    
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

module.exports.forgotPassword = async (req,res) =>{
    const {email} = req.body
    try{
        const existingUser = await userModel.findOne({ email });
        if(!existingUser){
            return res.json({status:"User does not exist!"})
        }
        const secret = jwt_secret + existingUser.password
        const token = jwt.sign({email:existingUser.email, id: existingUser._id}, secret, {expiresIn:'5m'})
        const link =`http://localhost:5000/reset-password/${existingUser._id}/${token}`
        res.json(link)
    }catch (error){}
}

module.exports.resetPassword = async (req,res) => {
    const {id, token} = req.params
    console.log(req.params)
    const existingUser = await userModel.findOne({ _id:id });
        if(!existingUser){
            return res.json({status:"User does not exist!"})
        }
        const secret = jwt_secret + existingUser.password
        try{
            const verify = jwt.verify(token,secret)
            res.render("index",{email: verify.email})
        }catch(error){
            res.send("Not Verified")
        }
}

module.exports.changePassword = async (req,res) => {
    const {id, token} = req.params;
    const {password} = req.body;
    if (!password) {
        return res.json({ status: "Error: Password is required!" });
    }
    const existingUser = await userModel.findOne({ _id:id });
        if(!existingUser){
            return res.json({status:"User does not exist!"})
        }
        const secret = jwt_secret + existingUser.password
        try{
            const verify = jwt.verify(token,secret);
            const encryptedPassword = await bcrypt.hash(password,12);
            await userModel.updateOne(
                {
                    _id:id
                },
                {
                    $set:{
                        password: encryptedPassword,
                    }
                }
            )
            res.json({status: "Password Updated!"})
            //res.render("index",{email: verify.email})
        }catch(error){
            console.error(error);
            res.json({ status: "Error updating password!" });
        }
}
