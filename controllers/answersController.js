const models = require('../models')
const answers = require('../models/answers')
const app = require('../app')

//Post an answer to a question
const addAnswer = async (req, res) => {
    const { body, userId } = req.body
    const id  = req.params.id
    
    try{
        const postAnswer = await models.answers.create({ userId, body, questionId: id })
        
    res.json(postAnswer)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    };

}

//Fetch all answers to a question
const fetchAnswers = async (req, res) => {
    
    try{
        const fetchAllAnswers = await models.answers.findAll()
        
    res.json(fetchAllAnswers)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error: 'No answer for this question' })
    };

};

//Comment on an answer
const commentAnswer = async (req, res) => {
    const { userId, body } = req.body
    const id  = req.params.id
    
    try{
        const postComment = await models.comments.create({  userId, body, answerId: id })
        
    res.json(postComment)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })
    };

};

//Accept an answer 
const acceptAnswer = async (req, res) => {
    const id = request.params.id
    const userId = req.user
    try{ 
        const answers = await models.answers.findbyPK(answerId);
        const questions = await questions.findOne({ where: { id: answers.questionId, userId }})

    if(!questions) {
        throw new Error("User not allowed");
    }
    const voteResult = await models.answers.update(
        { acceptedAnswer: false },
        { where: { id: answerId }}
    );
    if(voteResult[0] < 1) {
        res.status(500).json({ message: "Something went wrong" })
    }
    res.status(200).json({ message: "Answer accepted"})
    } catch(err) {
        return res.status(500).json({ msg: "No answer to upvote" })
    }  
    
};

//Upvote an answer
const upvoteAnswer = async (req, res) => {
    //const userVotes = { upvotes: Symbol("Upvote"), downvote: Symbol("Downvote")}
    const id = req.params.id
    try { 
  
        const answerToUpvote = await models.answers.findOne(
            { attributes: ["upvotes"] },
            { where: { id }
        })
        if (!answerToUpvote) 
        throw new Error("Answer does not exist.")

        const voteResult = await models.answers.update(

        { upvotes: answerToUpvote.upvotes + 1 },
        { where: { id } }
  
        )
        

        res.status(200).json({ msg: "Answer Upvoted" });
    } catch (err){
        console.log(err)
        return res.status(500).json({ msg: "No answer to upvote" })
    };
};

//Downvote an answer
const downvoteAnswer = async (req, res) => {
    
    const id = req.params.id
    try { 
  
        const answerToDownvote = await models.answers.findOne(
            { attributes: ["downvotes"] },
            { where: { id }
        })
        if (!answerToDownvote) 
        throw new Error("Answer does not exist.")
        

        const voteResult = await models.answers.update(
        { downvotes: answerToDownvote.downvotes + 1 },
        { where: { id } }
        )
        res.status(200).json({ msg: "Answer Downvoted" });
    } catch (err){
        console.log(err)
        return res.status(400).json({ msg: "No answer to downvote" })
    };
}

module.exports = { addAnswer, fetchAnswers, commentAnswer, acceptAnswer, upvoteAnswer, downvoteAnswer }
