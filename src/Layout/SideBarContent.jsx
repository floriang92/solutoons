import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LocalAtmRoundedIcon from "@material-ui/icons/LocalAtmRounded";
import { PreferenceContext } from "../Store/PreferenceContext";
import CustomButton from "../Components/Button/CustomButton";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import HouseOutlinedIcon from "@material-ui/icons/HouseOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import QueueIcon from "@material-ui/icons/Queue";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    outline: "none !important",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    outline: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    outline: "none !important",
    backgroundColor:"#023047"
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    outline: 0,
    backgroundColor:"#023047"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  itemsLink: {
    marginTop: "20px",
    fontFamily: "Prompt",
  },
  queueLink: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  },
  moreLink: {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
  },
  queueLinkFalse: {
    textDecoration: "none",
    color: "black",
    marginTop: "15px",
  },
  menuList: {
    display: "flex",
    flexDirection: "column",
  },
  menuListBottom: {
    position: "relative",
    top: "240px",
  },
  menuListBottomFalse: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: "240px",
  },
  menuListTop: {
    textAlign: "center",
    margin: "auto",
  },
  spanActions: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  spanActionsFalse: {
    display: "flex",
    justifyContent: "center",
    fontSize: "16px",
    marginTop: "15px",
  },
  paper: {
    border: "none",
    outline: "none !important",
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();

  const { preferenceDispatch } = React.useContext(PreferenceContext);
  const { preferenceState } = React.useContext(PreferenceContext);
  const [open, setOpen] = React.useState();

  function ChangeOpenValue() {
    preferenceDispatch({ type: "toggleDrawer", payload: false });
  }

  function sideBarItem(path, icon, label) {
    let content = (
      <MenuItem title={label} component={Link} to={"/" + path}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} style={{color:"#fff"}}/>
      </MenuItem>
    );
    return content;
  }

  React.useEffect(() => {
    setOpen(preferenceState.selectedPreference);
  }, [preferenceState.selectedPreference]);

  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={ChangeOpenValue}>
            <ChevronLeftIcon style={{color:"#fff"}} />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.itemsLink}>
          <div className={classes.menuList}>
            <div className={classes.menuListTop}>
              {sideBarItem("", <HouseOutlinedIcon style={{color:"#fff"}}/>, "Voir une vidéo")}
              {sideBarItem("MenuExamen", <HouseOutlinedIcon />, "Faire un examen")}   
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
