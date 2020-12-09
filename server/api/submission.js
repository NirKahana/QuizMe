const { Router } = require('express');
const { Submission } = require('../models');

const router = Router();

// GET ALL SUBMISSIONS
router.get('/all', async (req, res) => {
  const submissions = await Submission.findAll();
  return res.json(submissions);
});

// GET SUBMISSION BY ID 
router.get('/:id', async (req, res) => {
  const submission = await Submission.findByPk(req.params.id);
  return res.json(submission);
});

// POST A NEW USER
router.post('/', async (req, res) => {
  let body = req.body;
  if (!body.rank) {
    return res.status(400).json("ERROR: rank is missing!")
  } else {
    const newSubmission = await Submission.create(req.body);
    return res.json(newSubmission);
  }
});

module.exports = router;