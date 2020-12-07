import React from "react";
import Typography from '@material-ui/core/Typography';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

import Menu from './Menu';

export default function Header() {
  return (
    <>
      <AppBar>
        <Toolbar variant="dense">
          <IconButton edge="start" color="secondary" aria-label="menu">
            {/* <MenuRoundedIcon /> */}
            <Menu />
            <Typography variant="h6" color="inherit">
              QuizMe
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}
