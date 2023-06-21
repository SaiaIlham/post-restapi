const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../models/User')

// import validation
const { registerValidation, login validation } = require('../config/validation')

function result (succ, msg, details){
    if (details) {
        return{
            succes: succ,
            message: msg,
            data: details
        }
    }else {
        return{
            succes: succ,
            mesaage: msg
        }
    }
}

//register
router.post('/register', async (req,res) =>{
    const { error } = registerValidation(req.body)
    if(error) return res.status(200).json(result(0,error.details[0].message))

    //username exist
    const usernamaExist = await User.findOne ({ username: req.body.username})
    if(usernameExist) return res.status(200).json(result(0, 'Username already exists!'))

    //hash password
    const salt = await bcrypt.genSalat(10)
    const haspassword  = await bcrypt.hash(req.body.haspassword, salt)

    const user = new User({
        username:req.body.username,
        password: hashPassword
    })

    try {
        const saveUser = await user.save()
        res.status(200).json(result(1, 'Register User Succes!'))
    }catch (error) {
        
    }
})
