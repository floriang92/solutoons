import React from "react";
import Header from "./Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import SideBarContent from './SideBarContent';
import Dashboard from "../Pages/Dashboard";
import LoadingPage from "../Pages/LoadingPage";
import ProfilPage from "../Pages/ProfilPage";

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          "&:nth-child(n)": {
            color: "black",
          },
          "&:nth-child(3)": {
            padding: "0px !important",
          },
        },
      },
      MuiToolbar: {
        root: {
          backgroundColor: "#023047",
          color: "white",
        },
      },
      MuiTableFooter: {
        root: {
          backgroundColor: "#023047",
          color: "#73BA9B",
        },
      },
    },
  });
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor:"#FFB703"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  paper: {
    outline: 0, // Disable browser on-focus borders
  },
}));


function Layout() {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <SideBarContent />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/LoadingPage" component={LoadingPage} />
            <Route exact path="/ProfilPage" component={ProfilPage} />
          </Switch>
        </main>
      </div>
    </MuiThemeProvider>
  );
}

export default Layout;
