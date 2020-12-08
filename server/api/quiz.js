const { Router } = require('express');
const { Quiz, Question, Field } = require('../models');

const router = Router();


router.post('/', async (req, res) => {
  let body = req.body;
  if (!body.name) {
    return res.status(400).json("bad request")
  } else {
    const newQuiz = await Quiz.create(req.body);
    return res.json(newQuiz);
  }
});


router.get('/all', async (req, res) => {
  const quizzes = await Quiz.findAll();
  return res.json(quizzes);
});

router.get('/:id', async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id, {
    attributes: ["name"],
    include: [{model: Question, attributes: ["title"], include: [{model: Field, attributes: ['title']}]}]
  });
  return res.json(quiz);
});
// router.get('/:id', async (req, res) => {
//   const quiz = await Quiz.findByPk(req.params.id, {
//     attributes: ["name"],
//     include: [{model: Question, attributes: ["title"]}]
//   });
//   return res.json(quiz);
// });

// router.get('/:id/songs', async (req, res) => {
//   const artist = await Artist.findByPk(req.params.id, {
//     include: [{model: Song}]
//   });
//   return res.json(artist);
// });

// router.get('/:id/albums', async (req, res) => {
//   const artist = await Artist.findByPk(req.params.id, {
//     include: [{model: Album}]
//   });
//   return res.json(artist);
// });

// router.get('/:id/all', async (req, res) => {
//   const artist = await Artist.findByPk(req.params.id, {
//     include: [{model: Album, include: [{model: Song}]}]
//   });
  
//   return res.json(artist);
// });

// router.get('/:artistId/songs', async (req, res) => {
//   const artist = await Artist.findByPk(req.params.artistId);
//   const songs = await artist.getSongs();
//   return res.json(artists);
// });

module.exports = router;