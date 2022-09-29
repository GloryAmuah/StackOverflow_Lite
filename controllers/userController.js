const models = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

const register = async (req, res) => {
    try {
        const checkEmail = await models.User.findOne({ where: { email: req.body.email } })
        if (checkEmail) throw new Error ("User already exists")
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)

        const payload = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }
        const newUser = await models.User.create(payload)
        res.json({
            isSuccess: true,
            message: `Successfully registered ${newUser.name}`,
            data: {
                email: newUser.email
            }
        })
        } catch (error) {
        res.status(400).json({
            isSuccess: false,
            message: error.message,
            data: null
        })


    }
}

const login = async (req, res) => {
    try {
        const userMatch = await models.User.findOne({ where: { email: req.body.email } })

        if (!userMatch) throw new Error("User does not exist.")

        const isValidPassword = await bcryptjs.compare(req.body.password, userMatch.password)

        if (!isValidPassword) throw new Error("Invalid password")

        const token = jwt.sign({
            email: userMatch.email,
            userId: userMatch.id,
        }, process.env.JWT_KEY)

        res.json({
            isSuccess: true,
            message: "You are now signed in ....",
            data: {
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            isSuccess: false,
            message: error.message,
            data: null
        })
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try{
        const users = await models.User.findAll()
        return res.json(users)
    } catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = { register, login }
