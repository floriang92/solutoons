import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../Store/AuthContext"
import axios from "axios"

function DisplayLine(props){
    return <span> {props.line} * {props.nb} = </span>
}

function TablesMultiplication() {

  /////////////////////////////////////////////////////////////////////// Sujet de l'évaluation ///////////////////////////////////////////////////////////////////////
    const [nbRandom, setNbRandom] = useState({
        nb: Math.floor((Math.random()*11))
    })

    /////////////////////////////////////////////////////////////////////// Analyse des résultats ///////////////////////////////////////////////////////////////////////

    const [state, setState] = useState({
        m1: 0,
        m2: 0,
        m3: 0,
        m4: 0,
        m5: 0,
        m6: 0,
        m7: 0,
        m8: 0,
        m9: 0,
        m10: 0
    })

    function checkValue(){
        var nbError = 0;
        var name = ""
        for(var i = 1; i <= 10; i++ ){
            name = "m"+i
            if(state[name] != (nbRandom.nb * i)){
                nbError++;
            }
        }
        return nbError;
    }

    const handleChange = evt => {
        const name = evt.target.name;
        const value = evt.target.value;
        
        setState({
          ...state,
          [name]: value
        })
      }

      /////////////////////////////////////////////////////////////////////// Affichage des résultats ///////////////////////////////////////////////////////////////////////

    const handleSubmit = e => {
        var nbError = checkValue()
        if(nbError > 3){
            alert('Vous avez fait trop de faute pour regarder une vidéo. Votre score '+ (10-nbError)+'/10' )
        }else {
            alert('Bravo ! Tu as le droit de regarder une vidéo. Votre score '+ (10-nbError)+'/10' )
        }
        setNbError(nbError)
        e.preventDefault()
        setSubmit(true)
    }
    const [submit, setSubmit] = React.useState(false)
    const { authState, authDispatch } = React.useContext(AuthContext)
    const history = useHistory();
    const [nbError, setNbError] = React.useState(0)

    /////////////////////////////////////////////////////////////////////// Ajout de tokens si bonnes rponses ///////////////////////////////////////////////////////////////////////

    React.useEffect(() => {
        const sendExam = () => {
          axios({
            method: "PUT",
            url: "http://localhost:5000/api/v1/users/updateToken/" + authState.id,
            headers: { Authorization: "Bearer " + authState.token },
            data: {amount: 1}
          })
            .then((res) => {
                authDispatch({type:"updateToken", payload:res.data.newTokenAmount})
            })
            .catch((err) => {
              console.log(err);
            });
        }
    
        if (submit === true && nbError < 3) {
          sendExam();
          setSubmit(false)
          history.replace("/")
        }
      }, [submit, authState.token]);

    return (
            <form>
                <DisplayLine nb={ nbRandom.nb } line='1'></DisplayLine><input type="number" name="m1" onChange={handleChange} /><br />
                <DisplayLine nb={ nbRandom.nb } line='2'></DisplayLine><input type="number" name="m2" onChange={handleChange} /><br />
                <DisplayLine nb={ nbRandom.nb } line='3'></DisplayLine><input type="number" name="m3" onChange={handleChange} /><br />
                <DisplayLine nb={ nbRandom.nb } line='4'></DisplayLine><input type="number" name="m4" onChange={handleChange} /><br />
                <DisplayLine nb={ nbRandom.nb } line='5'></DisplayLine><input type="number" name="m5" onChange={handleChange} /><br />
                <DisplayLine nb={ nbRandom.nb } line='6'></DisplayLine><input type="number" name="m6" onChange={handleChange} /><br />
                <DisplayLine nb={ nbRandom.nb } line='7'></DisplayLine><input type="number" name="m7" onChange={handleChange} /><br />
                <DisplayLine nb={ nbRandom.nb } line='8'></DisplayLine><input type="number" name="m8" onChange={handleChange} /><br />
                <DisplayLine nb={ nbRandom.nb } line='9'></DisplayLine><input type="number" name="m9" onChange={handleChange} /><br />
                <DisplayLine nb={ nbRandom.nb } line='10'></DisplayLine><input type="number" name="m10" onChange={handleChange} /><br />
                <Button variant="contained" color="primary" onClick={ handleSubmit }>Envoyer mes réponses</Button>
            </form>
    )
}

export default TablesMultiplication