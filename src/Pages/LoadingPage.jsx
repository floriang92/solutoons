import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column ",
    height: "100vh",
  },
}));

export default function LoadingPage() {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.container} maxWidth="lg">
        <CircularProgress size="10rem" className={classes.CircularProgress} />
        <h1 id="title">Chargement en cours</h1>
      </Container>
    </>
  );
}
