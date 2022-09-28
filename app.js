const express = require('express');
const bodyParser = require('body-parser')
const { includes } = require('lodash');
const { REPL_MODE_SLOPPY } = require('repl');


const { sequelize, User, questions, answers, comments, votes } = require('./models');

//const user = require('./models/user');

const app = express();




const userRoute = require('./routes/user');
const questionsRoute = require('./routes/questions');
const answersRoute = require('./routes/answers');

app.use(express.json());
app.use(bodyParser.json());


app.use('/user', userRoute);
app.use('/questions', questionsRoute);
app.use('/answers', answersRoute);


 


// Get all users
app.get('/users', async (req, res) => {
    try{
        const users = await User.findAll()
        return res.json(users)
    } catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

// Find one user, with the questions they have asked
app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try{
        const user = await User.findOne({
            where: { uuid: uuid },
            include: 'questions',
        })
        return res.json(user)
    } catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

//Post a question
app.post('/questions', async (req, res) => {
    const { userId, title, body } = req.body
    
    try{
        const user = await User.findOne({ 
            where: { id: userId }
        })

        const postQuestion = await questions.create ({ title, body, userId })
        res.json(postQuestion)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

//Get all questions
app.get('/questions', async (req, res) => {
    
    try{
        const getQuestion = await questions.findAll()
        res.json(getQuestion)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})


//Fetch a specific question by question_id
app.get('/questions/:id', async (req, res) => {
    const id = req.params.id
    try{
        const fetchUniqueQuestion = await questions.findOne({
            where: { id: id }
        })
        return res.json(fetchUniqueQuestion)
    } catch(err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

//Delete a question
app.delete('/questions/:id', async (req, res) => {
    const id = req.params.id
    try{
        const questionToDelete = await questions.findOne({ where: { id } })
        if (!questionToDelete) 
        throw new Error("Question does not exist.")
        await questions.destroy({ where: { id } })
        return res.json({ message: 'Question deleted!' })
    }catch (err){
        console.log(err)
        return res.status(400).json({ error: err.message })
    }
})

//Post an answer to a question
app.post('/questions/answers/:id', async (req, res) => {
    const { body, userId } = req.body
    const id  = req.params.id
    
    try{
        const postAnswer = await answers.create({ userId, body, questionId: id })
        
    res.json(postAnswer)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    };

})

//Fetch all answers to a question
app.get('/questions/answers/:id', async (req, res) => {
    
    try{
        const fetchAllAnswers = await answers.findAll()
        
    res.json(fetchAllAnswers)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error: 'No answer for this question' })
    };

})

//Comment on an answer
app.post('/answers/comments/:id', async (req, res) => {
    const { userId, body } = req.body
    const id  = req.params.id
    
    try{
        const postComment = await comments.create({  userId, body, answerId: id })
        
    res.json(postComment)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    };

})

//Accept an answer 
app.put('/answers/accept/:id', async (req, res) => {
    const id = request.params.id
    const userId = req.user
    try{ 
        const answers = await answers.findbyPK(answerId);
        const questions = await questions.findOne({ where: { id: answers.questionId, userId }})

    if(!questions) {
        throw new Error("User not allowed");
    }
    const voteResult = await answers.update(
        { acceptedAnswer: false },
        { where: { id: answerId }}
    );
    if(voteResult[0] < 1) {
        res.status(500).json({ message: "Something went wrong" })
    }
    res.status(200).json({ message: "Answer accepted"})
    } catch(err) {

        console.log(err)
        return res.status(500).json({ msg: "No answer to upvote" })
    }
    
    
    
})

//Upvote an answer
app.put('/answers/upvote/:id', async (req, res) => {
    
    const id = req.params.id
    try { 
  
        const answerToUpvote = await answers.findOne(
            { attributes: ["upvotes"] },
            { where: { id }
        })
        if (!answerToUpvote) 
        throw new Error("Answer does not exist.")

        const voteResult = await answers.update(

        { upvotes: answerToUpvote.upvotes + 1 },
        { where: { id } }
  
        )
        

        res.status(200).json({ msg: "Answer Upvoted" });
    } catch (err){
        console.log(err)
        return res.status(500).json({ msg: "No answer to upvote" })
    };
})

//Downvote an answer
app.put('/answers/downvote/:id', async (req, res) => {
    
    const id = req.params.id
    try { 
  
        const answerToDownvote = await answers.findOne(
            { attributes: ["downvotes"] },
            { where: { id }
        })
        if (!answerToDownvote) 
        throw new Error("Answer does not exist.")
        

        const voteResult = await answers.update(

        { downvotes: answerToDownvote.downvotes + 1 },
        { where: { id } }
  
        )
        

        res.status(200).json({ msg: "Answer Downvoted" });
    } catch (err){
        console.log(err)
        return res.status(400).json({ msg: "No answer to downvote" })
    };
})





app.listen({ port: 3000 }, async () => {
    console.log('Server is running on http://localhost:3000')
    await sequelize.authenticate()
    console.log('Database connected!')
})


module.exports = app