import React from 'react'
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    button: {
      marginTop: theme.spacing(2),
      backgroundColor:"#023047"
    },
    text: {
        fontFamily: "fantasy"
    }
  }));

export default function WarningTokens() {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div style={{backgroundColor:"#FFB703"}}>
            <p>Tu n'as plus de vidéos disponibles, finis une évaluation pour obtenir des crédits !</p>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => {history.replace("/MenuExamen")}}
            >
                Je vais à la page d'évaluation !
            </Button>
        </div>
    )
}
