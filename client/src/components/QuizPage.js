import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  quiz: {
    fontWeight: "600",
    fontSize: "1.5em",
  },
  field: {
    cursor: "pointer",
    margin: "0.25em",
    backgroundColor: theme.palette.background.paper,
    padding: "5px",
  },
}));

export default function QuizPage() {
  const { id } = useParams();
  const classes = useStyles();
  const [quiz, setQuiz] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizIsOver, setQuizIsOver] = useState(false);
  const [finishTitle, setFinishTitle] = useState("Loading...");
  /// TIME REMAINING
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const fetchQuiz = async () => {
      const quiz = (await axios.get(`/quizzes/${id}`)).data;
      setQuiz(quiz);
    };
    fetchQuiz();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if(seconds > 0) {
        console.log(seconds);
        setSeconds(seconds => seconds-1);
      } else if(seconds === 0) {
        if(minutes > 0) {
          setMinutes(minutes => minutes-1);
          setSeconds(59);
        } else if(minutes === 0){
          clearInterval(countdown);
          onAnswerSelect(-1, countdown);
        }
      };
    },1000);
    return () => {
      clearInterval(countdown);
    }
  }, [seconds, minutes]);

  const findSelectedAnswerIdByTitle = (title) => {
    const currentFieldsArray = quiz.Questions[currentQuestionIndex].Fields;
    const selectedAnswer = currentFieldsArray.find(
      (field) => field.title === title
    );
    const id = selectedAnswer ? selectedAnswer.id : -1;
    return id;
  };
  const onAnswerSelect = (selectedAnswerId, interval) => {
    if (!quizIsOver) {
      console.log(selectedAnswerId);
      setAnswers([
        ...answers,
        {
          questionId: quiz.Questions[currentQuestionIndex].id,
          answerId: selectedAnswerId,
        },
      ]);
      if (quiz.Questions.length - 1 > currentQuestionIndex) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setMinutes(1);
        setSeconds(30);
      } else {
        if(interval){
          clearInterval(interval);
        };
        submitQuiz();
      }
    }
  };
  const submitQuiz = async () => {
    try {
      setQuizIsOver(true);
      await axios.post("/submissions", {
        userId: 3, // 3
        quizId: quiz.id, // 1
        answersSelected: answers,
      });
      setFinishTitle("Well done, quiz submitted successfully");
    } catch (error) {
      const errorMessage = error.response.data.message;
      setFinishTitle(errorMessage);
    }
  };
  // console.log("minutes: ", minutes, "seconds: ", seconds);
  if (quiz) {
    if (!quizIsOver) {
      return (
        <>
          <Container className={classes.quiz}>
            <div>
              <div>{quiz.Questions[currentQuestionIndex].title}</div>
              <div>Time Remaining: {minutes}:{(seconds < 10) ? "0"+seconds : seconds}</div>
            </div>
            <ol>
              {quiz.Questions[currentQuestionIndex].Fields.map(
                (field, index) => (
                  <li
                    key={index}
                    onClick={(e) => onAnswerSelect(findSelectedAnswerIdByTitle(e.target.value))}
                    className={classes.field}
                  >
                    {field.title}
                  </li>
                )
              )}
            </ol>
          </Container>
        </>
      );
    } else {
      return <div>{finishTitle}</div>;
    }
  } else {
    return null;
  }
}
