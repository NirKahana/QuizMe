import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  quiz: {
    fontWeight: '600',
    fontSize: '1.5em'
  },
  field: {
    cursor: 'pointer',
    margin: '0.25em',
    backgroundColor: theme.palette.background.paper,
    padding: '5px'
  }
}));

export default function Home() {
  const { id } = useParams();
  const classes = useStyles();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizIsOver, setQuizIsOver] = useState(false);
  const [quiz, setQuiz] = useState();
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const fetchQuiz = async () => {
      const quiz = (await axios.get(`/quizzes/${id}`)).data;
      setQuiz(quiz);
    };
    fetchQuiz();
  }, []);

  const onAnswerSelect = (e) => {
    const selectedAnswer = e.target.innerText;
    const CurrentFieldsArray = quiz.Questions[currentQuestionIndex].Fields;
    const selectedAnswerId = CurrentFieldsArray.find(
      (field) => field.title === selectedAnswer
    ).id;
    setAnswers([
      ...answers,
      {
        questionId: quiz.Questions[currentQuestionIndex].id,
        answerId: selectedAnswerId,
      },
    ]);
    quiz.Questions.length - 1 > currentQuestionIndex
      ? setCurrentQuestionIndex(currentQuestionIndex + 1)
      : submitQuiz();
  };
  const submitQuiz = () => {
    console.log(answers);
    setQuizIsOver(true);
  };

  if (quiz) {
    if (!quizIsOver) {
      return (
        <>
          <Container className={classes.quiz}>
            <div>{quiz.Questions[currentQuestionIndex].title}</div>
            <ul>
              {quiz.Questions[currentQuestionIndex].Fields.map(
                (field, index) => (
                  <li key={index} onClick={onAnswerSelect} className={classes.field}>
                    {field.title}
                  </li>
                )
              )}
            </ul>
            {/* <button onClick={submitQuiz}>Submit</button> */}
          </Container>
        </>
      );
    } else {
      return <div>Well Done! quiz submitted.</div>;
    }
  } else {
    return null;
  }
}
