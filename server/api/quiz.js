const { Router } = require('express');
const { Quiz, Question, Field, Submission, User, } = require('../models');
const db = require('../models/index');

const router = Router();

// GET ALL QUIZZES
router.get('/all', async (req, res) => {
  const quizzes = await Quiz.findAll();
  return res.json(quizzes);
});

// GET SUBMISSIONS OF QUIZ
router.get('/:id/submissions', async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id, {
    attributes: ["name"],
    include: [{model: Submission, attributes: ['rank'], include: [{model: User, attributes: ['name']}]}]
  });
  return res.json(quiz);
});

// GET QUIZ BY ID
router.get('/:id', async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id, {
    attributes: ["id", "name"],
    include: [{model: Question, attributes: ["id", "title"], include: [{model: Field, attributes: ['id', 'title']}]}]
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