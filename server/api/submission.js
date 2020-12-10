const { Router } = require("express");
const { Submission, Quiz, Question, Field } = require("../models");

const router = Router();

const calcRank = (quizQuestions, answersSelected) => {
  const numOfQuestions = quizQuestions.length;
  let numOfCorrectAnswers = 0;
  answersSelected.forEach((answer) => {
    const correctAnswerId = quizQuestions.find(
      (question) => question.id === answer.questionId
    ).Fields[0].id;
    if (correctAnswerId === answer.answerId) {
      numOfCorrectAnswers++;
    }
  });
  const rank = Math.floor((numOfCorrectAnswers / numOfQuestions) * 100);
  return rank;
};

// GET ALL SUBMISSIONS
router.get("/all", async (req, res) => {
  const submissions = await Submission.findAll();
  return res.json(submissions);
});

// GET SUBMISSION BY ID
router.get("/:id", async (req, res) => {
  const submission = await Submission.findByPk(req.params.id);
  return res.json(submission);
});

// POST A NEW SUBMISSION
router.post("/", async (req, res) => {
  let body = req.body;
  if (!body.answersSelected) {
    return res
      .status(403)
      .json({message: "Failed to submit quiz, property 'answersSelected' is missing!"});
  } else if(!body.userId) {
    return res.status(403).json({message: "Failed to submit quiz, property 'userId' is missing!"});
  } else if(!body.quizId) {
    return res.status(403).json({message: "Failed to submit quiz, property 'quizId' is missing!"});
  } else {
    const submissionByThisUser = await Submission.findOne({
      where: {
        quizId: body.quizId,
        userId: body.userId,
      },
    });
    // "This user already submitted this quiz!"
    if (submissionByThisUser) {
      res.status(403).json({message: "Failed to submit quiz, user already submitted this quiz!"});
    } else {
      const answersSelected = body.answersSelected;
      const quizId = body.quizId;
      const userId = body.userId;
      const quizQuestions = await (await Quiz.findByPk(quizId)).getQuestions({
        attributes: ["id"],
        include: [
          {
            model: Field,
            attributes: ["id"],
            where: {
              isCorrect: true,
            },
          },
        ],
      });
      const rank = calcRank(quizQuestions, answersSelected);
      const newSubmission = await Submission.create({ userId, quizId, rank});
      return (newSubmission) ? res.json(newSubmission) : res.status(404).json("failed to create submission") 
    }
  }
  // res.json(body)
});

module.exports = router;
