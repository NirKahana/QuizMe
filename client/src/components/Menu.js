import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

const useStyles = makeStyles({
  menuIcon: {
    marginRight: '1em'
  },
});

const MenuPopupState = () => {
  const menuIconRef = useRef();
  const classes = useStyles();
  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
  return (
    <div>
      <MenuRoundedIcon
        variant="contained"
        {...bindTrigger(popupState)}
        ref={menuIconRef}
        className={classes.menuIcon}
      />
      <Menu
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        getContentAnchorEl={null}
        anchorEl={menuIconRef.current}
      >
        <MenuItem onClick={popupState.close}>Node.js</MenuItem>
        <MenuItem onClick={popupState.close}>CSS</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuPopupState;
