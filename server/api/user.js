const { Router } = require('express');
const { User, Quiz, Question, Field } = require('../models');

const router = Router();

// GET ALL USERS
router.get('/all', async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

// GET USER BY ID 
router.get('/:id', async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id);
  return res.json(quiz);
});

// POST A NEW USER
router.post('/', async (req, res) => {
  let body = req.body;
  if (!body.name) {
    return res.status(400).json("ERROR: 'name' is missing!")
  } else {
    const newUser = await User.create(req.body);
    return res.json(newUser);
  }
});


module.exports = router;