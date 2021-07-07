import React from 'react'
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
function MathMenu() {
    const history = useHistory()
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => history.replace("/TablesMultiplication")}>Tables de multiplication</Button>
        </div>
    )
}

export default MathMenu