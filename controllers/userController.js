const models = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

const register = async (req, res) => {
    const checkEmail = await models.User.findOne({ where: { email: req.body.email }})
        if (checkEmail) {
            res.status(400).json({ message: "Email already exists" })
        } else {
            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(req.body.password, salt, async (err, hash) => {
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                    try {
                        await models.User.create(user)
                        return res.status(200).json({ message: "User created successfuly" })
                
                    } catch(err) {
                        console.log(err)
                        res.status(500).json({ message: "Something went wrong" })
                
                
                    }
                    
        
                })
            })
        }       
 
}

const login = async (req, res) => {
    const userMatch = await models.User.findOne({ where: { email: req.body.email }})

    if (!userMatch){
        res.status(400).json({ message: "User not found" })
    } else {
        bcryptjs.compare(req.body.password, userMatch.password, (err, result) => {
            
            if(result){
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id,
                }, process.env.JWT_KEY, function (err, token) {
                    res.status(200).json({ message: "Authentication successful", token: token
                
                })
                
                }) 
            } else  {
                res.status(400).json({ message: "Invalid Credentials" })

            }
        })
    } 
}

// // Get all users
// const getAllUsers = async (req, res) => {
//     try{
//         const users = await User.findAll()
//         return res.json(users)
//     } catch(err){
//         console.log(err)
//         return res.status(500).json({ error: 'Something went wrong' })
//     }
// }

module.exports = { register, login }
