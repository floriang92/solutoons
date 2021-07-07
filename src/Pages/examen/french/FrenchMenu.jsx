import React from 'react'
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

function FrenchMenu() {
    const history = useHistory()
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => history.replace("/FormWordsOrder")}>Mettre les mots dans le bon ordre</Button>
        </div>
    )
}

export default FrenchMenu