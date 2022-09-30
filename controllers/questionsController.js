const models = require('../models');
const questions = require('../models/questions');
const app = require('../app');

//Post a question
const addQuestion = async (req, res) => {
    const { title, question } = req.body
    const userId = req.userId

    try {
        const postQuestion = await models.questions.create({ title, question, userId })
        res.json({
            is_success: Boolean,
            message: "Question posted",
            data: {title: title, question}
               
            
 })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

//Get all questions
const fetchAllQuestions = async (req, res) => {

    try {
        const getQuestion = await models.questions.findAll({
            raw: true,
            attributes: ['id', 'title'],
            include:[{model: models.User, attributes: ["id", "name"], required:false}]
        })
        const response = {
            is_success: true,
            message: "Questions successfully fetched",
            data: getQuestion
        }
        res.json(response)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


//Fetch a specific question by question_id
const fetchQuestionById = async (req, res) => {
    const id = req.params.id
    
    try {
        const question = await models.questions.findOne({
            where: { id: id },
            include:[{model: models.User, attributes: ["id", "name"], required:false}],
            raw: true
        })
        return res.json({
            is_success: true,
            message: "Fetch question",
            data: {
                id: question.id,
                title: question.title,
                question: question.question,
                postedBy: question["User.name"]
            }
        })
         } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

//Delete a question
const deleteQuestion = async (req, res) => {
    const id = req.params.id
    const userId = req.userId
    try {
        const questionToDelete = await models.questions.findOne({
            raw: true,
            where: { id }
        })
        if (!questionToDelete) throw new Error('Question does not exist')

        if (userId !== questionToDelete.userId) throw new Error("You cannot delete other's question")

        await models.questions.destroy({ where: { id, userId } })
        const response = {
            is_success: true,
            message: "Question was successfully deleted",
            data: {
                id: questionToDelete.id,
                title: questionToDelete.title
            }
        }
        return res.json(response)
        } catch (err) {
        
        return res.status(400).json({ error: err.message })
    }
}

module.exports = { addQuestion, fetchAllQuestions, fetchQuestionById, deleteQuestion }