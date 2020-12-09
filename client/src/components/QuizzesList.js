import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
// import { PanoramaFishEye, CheckCircleOutline } from "@material-ui/icons/";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1em 0",
  },
  list: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    padding: "0 0.5em",
    borderRadius: "5px",
  },
  li: {
    margin: "0.75em 0",
    backgroundColor: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.secondary.main,
    fontWeight: 500,
  },
}));

export default function QuizzesList() {
  const classes = useStyles();

  const [quizzes, setQuizzes] = useState();
  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = (await axios.get("/quizzes/all")).data;
      setQuizzes(quizzes);
    };
    fetchQuizzes();
  }, []);

  return quizzes ? (
    <>
      <Container className={classes.container}>
        <Container className={classes.list}>
          <List>
            {quizzes.map((quiz, index) => (
              <Link to={`/quiz/${quiz.id}`} style={{textDecoration: "none"}} key={index}>
                <ListItem className={classes.li}>
                  <ListItemText
                    primary={quiz.name}
                    className={classes.text}
                    disableTypography
                  ></ListItemText>
                  <ListItemIcon>
                    <RadioButtonUncheckedIcon edge="end" />
                  </ListItemIcon>
                </ListItem>
              </Link>
            ))}
            {/* <ListItem className={classes.li}>
              <ListItemText primary="React" className={classes.text} disableTypography></ListItemText>
              <ListItemIcon>
                <PanoramaFishEye edge="end"/>
              </ListItemIcon>
            </ListItem>
            <ListItem className={classes.li}>
              <ListItemText primary="CSS" className={classes.text} disableTypography></ListItemText>
              <ListItemIcon>
                <CheckCircleOutline edge="end"/>
              </ListItemIcon>
            </ListItem> */}
          </List>
        </Container>
      </Container>
    </>
  ) : null;
}
