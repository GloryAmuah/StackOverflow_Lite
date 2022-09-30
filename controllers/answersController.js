const models = require('../models')
const answers = require('../models/answers')
const app = require('../app')

//Post an answer to a question
const addAnswer = async (req, res) => {
    const { answer } = req.body
    const id  = req.params.id
    const userId = req.userId
    
    try{
        const postAnswer = await models.answers.create({ answer, questionId: id, userId })
        res.json({
            is_success: true,
            message: "Successfully posted an answer",
            data: {
                id: postAnswer.id,
                answer: postAnswer.answer
            }
        })
    } catch (err){
        return res.status(400).json({
            is_success: false,
            message: err.message,
            data: null,
          })
  
    };

}

//Fetch all answers to a question
const fetchAnswers = async (req, res) => {
    
    try{
        const fetchAllAnswers = await models.answers.findAll()
        
    res.json({
        is_success: true,
        message: "Question answered",
        data: fetchAllAnswers
})
    } catch (err){
        console.log(err)
        return res.status(400).json({ error: err.message })
    };

};

//Comment on an answer
const commentAnswer = async (req, res) => {
    const { comment } = req.body
    const id  = req.params.id
    const userId = req.userId
    
    try{
        const postComment = await models.comments.create({  userId, comment, answerId: id })
        
        res.json({
            is_success: true,
            message: "Comment added",
            data: postComment
 })
    } catch (err){
        console.log(err)
        return res.status(400).json({ error: err.message })
    };

};

//Accept an answer 
const acceptAnswer = async (req, res) => {
    
    const id = req.params.id
    const userId = req.userId
    try { 
        const answers = await models.answers.findOne({ where: { id: id }});
        
        const questions = await models.questions.findOne({ where: { id: answers.questionId, userId }})

        const voteResult = await models.answers.update(
        { acceptedAnswer: true },
        { where: { id: id }}
        );

        //if(voteResult[0] < 1) { res.status(500).json({ message: "Something went wrong" }) }
        res.status(200).json({
            is_success: true,
            message: "Answer has been accepted",
            data: {}
        
               
        })
        } catch(err) {
        return res.status(400).json({ error: err.message })
        }
    
};

//Upvote an answer
const upvoteAnswer = async (req, res) => {
    
    const id = req.params.id
    
    try { 
        const answerToUpvote = await models.answers.findOne(
            { attributes: ["upvotes"] },
            { where: { id: id }
        })

        const voteResult = await models.answers.update(
        { upvotes: answerToUpvote.upvotes + 1 },
        { where: { id: id }}
        )
        res.status(200).json({ msg: "Answer Upvoted" });
        } catch (err) {
        return res.status(400).json({ error: err.message })
    };
};

//Downvote an answer
const downvoteAnswer = async (req, res) => {
    
    const id = req.params.id
    
    try { 
        const answerToDownvote = await models.answers.findOne(
            { attributes: ["downvotes"] },
            { where: { id: id }
        })

        const voteResult = await models.answers.update(
        { downvotes: answerToDownvote.downvotes - 1 },
        { where: { id: id } }
        )
        res.status(200).json({ msg: "Answer Downvoted" });
        } catch (err){
        return res.status(400).json({ error: err.message })
    };
}

module.exports = { addAnswer, fetchAnswers, commentAnswer, acceptAnswer, upvoteAnswer, downvoteAnswer }
