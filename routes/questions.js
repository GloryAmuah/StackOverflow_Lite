const express = require ('express');
const questionsController = require ('../controllers/questionsController');
const checkAuthMiddleware = require ('../middleware/check-auth');


const router = express.Router();

router.post('/', checkAuthMiddleware.checkAuth, questionsController.addQuestion)//add a question
router.get('/', questionsController.fetchAllQuestions)//fetch all questions
router.get('/:id', questionsController.fetchQuestionById)//fetch a specific question
router.delete('/:id', checkAuthMiddleware.checkAuth, questionsController.deleteQuestion)//delete a question
//router.get('/users/:uuid',checkAuthMiddleware.checkAuth, questionsController.fetchQuestionById)//get user with all the questions they have asked


module.exports = router;