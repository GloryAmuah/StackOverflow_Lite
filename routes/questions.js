const express = require ('express');
const questionsController = require ('../controllers/questionsController');
const checkAuthMiddleware = require ('../middleware/check-auth');


const router = express.Router();

router.post('/questions', checkAuthMiddleware.checkAuth, questionsController.addQuestion)//add a question
router.get('/questions', questionsController.fetchAllQuestions)//fetch all questions
router.get('/questions/:id', questionsController.fetchQuestionById)//fetch a specific question
router.get('/users/:uuid',checkAuthMiddleware.checkAuth, questionsController.fetchQuestionById)//get user with all the questions they have asked
router.delete('/questions/:id', checkAuthMiddleware.checkAuth, questionsController.deleteQuestion)//delete a question


module.exports = router;