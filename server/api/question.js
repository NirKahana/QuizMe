const { Router } = require('express');
const { Question } = require('../models');

const router = Router();

// GET ALL QUESTIONS
router.get('/all', async (req, res) => {
  const questions = await Question.findAll();
  return res.json(questions);
});

// GET SUBMISSIONS OF QUIZ
router.get('/:id/submissions', async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id, {
    attributes: ["name"],
    include: [{model: User}]
  });
  return res.json(quiz);
});

// GET QUIZ BY ID
router.get('/:id', async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id, {
    attributes: ["name"],
    include: [{model: Question, attributes: ["title"], include: [{model: Field, attributes: ['title', 'isCorrect']}]}]
  });
  return res.json(quiz);
});

// GET QUESTIONS OF QUIZ
router.get('/:id/questions', async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id);
  const questions = await quiz.getQuestions();
  return res.json(questions);
});

// POST A NEW QUIZ
router.post('/', async (req, res) => {
  let body = req.body;
  if (!body.name) {
    return res.status(400).json("bad request")
  } else {
    const newQuiz = await Quiz.create(req.body);
    return res.json(newQuiz);
  }
});

module.exports = router;