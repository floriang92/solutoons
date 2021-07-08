import React from 'react'
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

function GeographyMenu() {
    const history = useHistory()
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => history.replace("/FindCountryFlag")}>Trouve le pays</Button>
        </div>
    )
}

export default GeographyMenu