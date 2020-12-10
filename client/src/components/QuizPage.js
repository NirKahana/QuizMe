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
  const [quiz, setQuiz] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizIsOver, setQuizIsOver] = useState(false);
  const [finishTitle, setFinishTitle] = useState("Loading...");

  useEffect(() => {
    const fetchQuiz = async () => {
      const quiz = (await axios.get(`/quizzes/${id}`)).data;
      setQuiz(quiz);
    };
    fetchQuiz();
  }, []);

  // useEffect(() => {
    //   if(quizIsOver){
      //     submitQuiz();
      //   }
      // },[quizIsOver])
      
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
  
  const submitQuiz = async () => {
    try {
      setQuizIsOver(true);
      const submission = await axios.post("/submissions", {
        userId: 3, // 3
        quizId: quiz.id, // 1
        answersSelected: answers
      });
      setFinishTitle("Well done, quiz submitted successfully");
    }
    catch(error) {
      const errorMessage = error.response.data.message;
      setFinishTitle(errorMessage);
    }

    // fetch("/submissions", 
    //     {
    //       body: JSON.stringify({
    //         userId: 3, // 3
    //         quizId: quiz.id, // 1
    //         answersSelected: answers
    //       }),
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json;charset=utf-8'"
    //       }
    //     }).then(result => {
    //       console.log(result);
    //       result.json().then(res => {
    //         console.log(res);
    //       })
    //     })
    //     .catch(err => {
    //       console.log(err.message);
    //     })

    // submission ? setFinishTitle("Well done, quiz submitted successfully") : setFinishTitle("Failed to submit quiz, please try again later")
  };
  
  if (quiz) {
    if (!quizIsOver) {
      return (
        <>
          <Container className={classes.quiz}>
            <div>{quiz.Questions[currentQuestionIndex].title}</div>
            <ol>
              {quiz.Questions[currentQuestionIndex].Fields.map(
                (field, index) => (
                  <li key={index} onClick={onAnswerSelect} className={classes.field}>
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
