import React, { Fragment } from "react";
import { useTranslate } from "react-admin";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import classnames from "classnames";

const theme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    icon: { minWidth: theme.spacing(5) },
    sidebarIsOpen: {
      "& a": {
        paddingLeft: theme.spacing(3),
        transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
      },
    },
    sidebarIsClosed: {
      "& a": {
        paddingLeft: theme.spacing(2),
        transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
      },
    },
    menuItem: {},
    menuItemName: {
      color: theme.palette.secondary,
    },
    openMenuItem: {},
  }),
  { name: "RaTreeCustomMenuItem" }
);

const CustomMenuItem = ({
  handleToggle,
  sidebarIsOpen,
  isOpen,
  name,
  icon,
  children,
  dense,
  setMenuColors,
}) => {
  const classes = useStyles();
  const translate = useTranslate();

  const header = (
    <MenuItem
      key={name}
      dense={dense}
      onClick={handleToggle}
      className={classnames(classes.menuItem, {
        [classes.openMenuItem]: isOpen,
      })}
    >
      <ListItemIcon className={classes.icon}>
        {isOpen ? <ExpandMore /> : icon}
      </ListItemIcon>
      <Typography
        variant="inherit"
        color={setMenuColors ? "primary.main" : ""}
        className={classnames(classes.menuItemName, "menuItemName")}
      >
        {translate(name)}
      </Typography>
    </MenuItem>
  );

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        {sidebarIsOpen || isOpen ? (
          header
        ) : (
          <Tooltip title={translate(name)} placement="right">
            {header}
          </Tooltip>
        )}
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List
            dense={dense}
            component="div"
            disablePadding
            className={
              sidebarIsOpen ? classes.sidebarIsOpen : classes.sidebarIsClosed
            }
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            {children}
          </List>
        </Collapse>
      </Fragment>
    </ThemeProvider>
  );
};

export default CustomMenuItem;
