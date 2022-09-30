const express = require ('express');
const answersController = require ('../controllers/answersController');
const checkAuthMiddleware = require ('../middleware/check-auth');

const router = express.Router();

router.post('/questions/answers/:id', checkAuthMiddleware.checkAuth, answersController.addAnswer)//add an answer to a question
router.get('/questions/answers/:id', answersController.fetchAnswers)//fetch all answers to a question
router.post('/:id/comments/', checkAuthMiddleware.checkAuth, answersController.commentAnswer)//comment on an answer
router.put('/:id/accept', checkAuthMiddleware.checkAuth, answersController.acceptAnswer)//accept an answer
router.put('/:id/upvote', checkAuthMiddleware.checkAuth, answersController.upvoteAnswer)//upvote an answer
router.put('/:id/downvote', checkAuthMiddleware.checkAuth, answersController.downvoteAnswer)//downvote an answer

//router.post('/answers/comments/:id', checkAuthMiddleware.checkAuth, answersController.commentAnswer)//comment on an answer
// router.put('/answers/accept/:id', checkAuthMiddleware.checkAuth, answersController.acceptAnswer)//accept an answer
// router.put('/answers/upvote/:id', checkAuthMiddleware.checkAuth, answersController.upvoteAnswer)//upvote an answer
// router.put('/answers/downvote/:id', checkAuthMiddleware.checkAuth, answersController.downvoteAnswer)//downvote an answer


module.exports = router;

