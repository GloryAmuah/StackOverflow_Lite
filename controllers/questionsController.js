const models = require('../models');
const questions = require('../models/questions');
const app = require('../app');

//Post a question
const addQuestion = async (req, res) => {
    const { userId, title, body } = req.body
    
    try{
        const user = await models.User.findOne({ 
            where: { id: userId }
        })

        const postQuestion = await models.questions.create ({ title, body, userId })
        res.json(postQuestion)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

//Get all questions
const fetchAllQuestions = async (req, res) => {
    
    try{
        const getQuestion = await models.questions.findAll()
        res.json(getQuestion)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}


//Fetch a specific question by question_id
const fetchQuestionById = async (req, res) => {
    const id = req.params.id
    try{
        const fetchUniqueQuestion = await models.questions.findOne({
            where: { id: id }
        })
        return res.json(fetchUniqueQuestion)
    } catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

//Delete a question
const deleteQuestion = async (req, res) => {
    const id = req.params.id
    try{
        const questionToDelete = await models.questions.findOne({ where: { id } })
        if (!questionToDelete) 
        throw new Error("Question does not exist.")
        await questions.destroy({ where: { id } })
        return res.json({ message: 'Question deleted!' })
    }catch (err){
        console.log(err)
        return res.status(400).json({ error: err.message })
    }
}

module.exports = { addQuestion, fetchAllQuestions, fetchQuestionById, deleteQuestion }