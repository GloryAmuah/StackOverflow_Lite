const express = require ('express');
const questionsController = require ('../controllers/questionsController');
const checkAuthMiddleware = require ('../middleware/check-auth');
const answersController = require ('../controllers/answersController');

const router = express.Router();

router.post('/', checkAuthMiddleware.checkAuth, questionsController.addQuestion)//add a question
router.get('/', questionsController.fetchAllQuestions)//fetch all questions
router.get('/:id', questionsController.fetchQuestionById)//fetch a specific question
router.delete('/:id', checkAuthMiddleware.checkAuth, questionsController.deleteQuestion)//delete a question
router.post('/:id/answers', checkAuthMiddleware.checkAuth, answersController.addAnswer)//add an answer to a question
router.get('/:id/answers', answersController.fetchAnswers)//fetch all answers to a question


module.exports = router;
