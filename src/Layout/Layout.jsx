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
import MenuExamen from "../Pages/examen/MenuExamen";
import FrenchMenu from "../Pages/examen/french/FrenchMenu";
import MathMenu from "../Pages/examen/math/MathMenu";
import GeographyMenu from "../Pages/examen/geography/GeographyMenu";
import TablesMultiplication from "../Pages/examen/math/tables_multiplication";
import FormWordsOrder from "../Pages/examen/french/FormWordsOrder";
import FindCountryFlag from "../Pages/examen/geography/FindCountryFlag";

/////////////////////////////////////////////////////////////////////// CSS ///////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////// Affichage Layout + gestion routes ///////////////////////////////////////////////////////////////////////

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
            <Route exact path="/MenuExamen" component={MenuExamen} />
            <Route exact path="/FrenchMenu" component={FrenchMenu} />
            <Route exact path="/FormWordsOrder" component={FormWordsOrder} />
            <Route exact path="/MathMenu" component={MathMenu} />
            <Route exact path="/TablesMultiplication" component={TablesMultiplication} />
            <Route exact path="/GeographyMenu" component={GeographyMenu} />
            <Route exact path="/FindCountryFlag" component={FindCountryFlag} />
          </Switch>
        </main>
      </div>
    </MuiThemeProvider>
  );
}

export default Layout;
