const { Router } = require('express');
const { User, Submission, Quiz, Question, Field } = require('../models');

const router = Router();

// GET ALL USERS
router.get('/all', async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

// GET USER BY ID 
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  return res.json(user);
});
// GET USER SUBMISSIONS 
router.get('/:id/submissions', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const userSubmissions = await user.getSubmissions({
    attributes: ["quizId", "rank"]
  });
  return res.json(userSubmissions);
});
// // GET USER SUBMISSIONS 
// router.get('/:id/submissions', async (req, res) => {
//   const user = await User.findByPk(req.params.id, {
//     attributes: ["id", "name"],
//     include: [{
//       model: Submission,
//       attributes: ["quizId", "rank"]
//     }]
//   });
//   return res.json(user);
// });

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