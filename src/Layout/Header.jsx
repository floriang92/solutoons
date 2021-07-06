import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { PreferenceContext } from "../Store/PreferenceContext";
import Badge from "@material-ui/core/Badge";
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";

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
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  titleApp: {
    fontFamily: "Roboto",
    fontWeight: "bold",
  },

  navbarContainer: {
    display: "flex",
    justifyContent:"space-between",
    width:"100%",
    alignItems: "center",
  },
  sectionIcons: {
    display: "flex",
    alignItems: "center",
  },
  avatarIcon:{
    marginLeft:"1vw",
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const { preferenceDispatch, preferenceState } = React.useContext(
    PreferenceContext
  );

  const [open, setOpen] = React.useState();

  React.useEffect(() => {
    setOpen(preferenceState.selectedPreference);
  }, [preferenceState.selectedPreference]);

  function ChangeOpenValue() {
    preferenceDispatch({ type: "toggleDrawer", payload: true });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ChangeOpenValue}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.navbarContainer}>
            <div>
            {/* <Link to="/ProfilPage">
              <img src={process.env.PUBLIC_URL + '/Images/logoSansFond.jpg'} />
            </Link> */}
              <Typography className={classes.titleApp} variant="h6" noWrap>
                SOLUTOONS
              </Typography>
            </div>
            <div className={classes.sectionIcons}>
              
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Link to="/ProfilPage" className={classes.queueLink}>
                <Avatar className={classes.avatarIcon} alt="Remy Sharp" src="BlackWidow-EndgameProfile.jpg" />
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
