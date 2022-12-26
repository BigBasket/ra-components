import React, { useState } from "react";
import LabelIcon from "@mui/icons-material/Label";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  MenuItemLink,
  useResourceDefinitions,
  useTranslate,
  DashboardMenuItem,
  useSidebarState,
} from "react-admin";
import PropTypes from "prop-types";
import classnames from "classnames";
import DefaultIcon from "@mui/icons-material/ViewList";
import CustomMenuItem from "./CustomMenuItem";

const theme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    main: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      marginTop: "0.5em",
      [theme.breakpoints.only("xs")]: {
        marginTop: 0,
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "1.5em",
      },
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    open: {
      width: 200,
    },
    closed: {
      width: 55,
    },
  }),
  { name: "RaTreeMenu" }
);

export const TreeMenu = (props) => {
  const {
    className,
    dense,
    hasDashboard,
    onMenuClick,
    logout,
    dashboardlabel,
    ...rest
  } = props;

  const classes = useStyles(props);
  const translate = useTranslate();
  const [open] = useSidebarState();
  const pathname = window.location.hash;
  let allResources = useResourceDefinitions();
  const resources = Object.keys(allResources).map((name) => allResources[name]);
  const hasList = (resource) => resource.hasList;

  const handleToggle = (parent) => {
    setState((state) => ({ [parent]: !state[parent] }));
  };

  const isParent = (resource) =>
    resource.options &&
    resource.options.hasOwnProperty("isMenuParent") &&
    resource.options.isMenuParent;

  const isOrphan = (resource) =>
    resource.options &&
    !resource.options.hasOwnProperty("menuParent") &&
    !resource.options.hasOwnProperty("isMenuParent");

  const isChildOfParent = (resource, parentResource) =>
    resource.options &&
    resource.options.hasOwnProperty("menuParent") &&
    resource.options.menuParent == parentResource.name;
  const geResourceName = (slug) => {
    if (!slug) return;
    var words = slug.toString().split("_");
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return words.join(" ");
  };

  const getPrimaryTextForResource = (resource) => {
    let resourcename = "";
    if (resource.options && resource.options.label)
      resourcename = resource.options.label;
    else if (resource.name) {
      resourcename = translate(`resources.${resource.name}.name`);
      if (resourcename.startsWith("resources."))
        resourcename = geResourceName(resource.name);
    }
    return resourcename;
  };

  const MenuItem = (resource) => (
    <MenuItemLink
      key={resource.name}
      to={`/${resource.name}`}
      primaryText={getPrimaryTextForResource(resource)}
      leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
      onClick={onMenuClick}
      dense={dense}
      sidebarIsOpen={open}
    />
  );

  const mapParentStack = (parentResource) => (
    <CustomMenuItem
      key={parentResource.name}
      handleToggle={() => handleToggle(parentResource.name)}
      isOpen={
        state[parentResource.name] ||
        parentActiveResName === parentResource.name
      }
      sidebarIsOpen={open}
      name={getPrimaryTextForResource(parentResource)}
      icon={parentResource.icon ? <parentResource.icon /> : <LabelIcon />}
      dense={dense}
    >
      {
        // eslint-disable-next-line
        resources
          .filter(
            (resource) =>
              isChildOfParent(resource, parentResource) && hasList(resource)
          )
          .map((childResource) => {
            return MenuItem(childResource);
          })
      }
    </CustomMenuItem>
  );

  const mapIndependent = (independentResource) =>
    hasList(independentResource) && MenuItem(independentResource);

  const initialExpansionState = {};
  let parentActiveResName = null;

  resources &&
    resources.length > 0 &&
    resources.forEach((resource) => {
      if (isParent(resource)) {
        initialExpansionState[resource.name] = false;
      } else if (
        pathname.startsWith(`#/${resource.name}`) &&
        resource.options.hasOwnProperty("menuParent")
      ) {
        parentActiveResName = resource.options.menuParent;
      }
    });

  const [state, setState] = useState(initialExpansionState);
  const resRenderGroup = [];

  resources &&
    resources.length > 0 &&
    resources.forEach((resource) => {
      if (isParent(resource)) resRenderGroup.push(mapParentStack(resource));
      if (isOrphan(resource)) resRenderGroup.push(mapIndependent(resource));
    });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div
          className={classnames(classes.main, className, {
            [classes.open]: open,
            [classes.closed]: !open,
          })}
          {...rest}
        >
          {hasDashboard && (
            <DashboardMenuItem
              onClick={onMenuClick}
              dense={dense}
              sidebarIsOpen={open}
              primaryText={dashboardlabel}
            />
          )}
          {resRenderGroup}
        </div>
      </div>
    </ThemeProvider>
  );
};

TreeMenu.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  dense: PropTypes.bool,
  hasDashboard: PropTypes.bool,
  logout: PropTypes.element,
  onMenuClick: PropTypes.func,
  dashboardlabel: PropTypes.string,
};

TreeMenu.defaultProps = {
  onMenuClick: () => null,
  dashboardlabel: "Dashboard",
};
