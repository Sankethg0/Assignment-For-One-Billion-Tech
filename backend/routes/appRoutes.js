const {Router} = require('express')
const {signupUser,loginUser} = require('../controllers/userController')
const {saveTodo} = require('../controllers/todosController')

const router = Router()

router.get('/',(req,res) => {
    res.json({message:"Hello There"})
})

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/saveTodo',saveTodo)


module.exports = router