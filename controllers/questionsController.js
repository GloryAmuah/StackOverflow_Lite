const models = require('../models');
const questions = require('../models/questions');
const app = require('../app');

//Post a question
const addQuestion = async (req, res) => {
    const { title, body } = req.body
    const userId = req.userId

    try {
        const postQuestion = await models.questions.create({ title, body, userId })
        res.json(postQuestion)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

//Get all questions
const fetchAllQuestions = async (req, res) => {

    try {
        const getQuestion = await models.questions.findAll()
        res.json(getQuestion)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


//Fetch a specific question by question_id
const fetchQuestionById = async (req, res) => {
    const id = req.params.id
    
    try {
        const fetchUniqueQuestion = await models.questions.findOne({
            where: { id: id }
        })
        return res.json(fetchUniqueQuestion)
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

//Delete a question
const deleteQuestion = async (req, res) => {
    const id = req.params.id
    const userId = req.userId
    try {
        const questionToDelete = await models.questions.findOne({ where: { id, userId } })
        if (!questionToDelete)
            throw new Error("Question does not exist.")
        await models.questions.destroy({ where: { id, userId } })
        return res.json({ message: 'Question deleted!' })
    } catch (err) {
        
        return res.status(400).json({ error: err.message })
    }
}

module.exports = { addQuestion, fetchAllQuestions, fetchQuestionById, deleteQuestion }