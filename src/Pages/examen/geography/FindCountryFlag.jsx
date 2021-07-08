import React, { useState } from 'react'
import Button from "@material-ui/core/Button";
import axios from 'axios'
import { ChildContext } from "../../../Store/ChildContext"
import { AuthContext } from "../../../Store/AuthContext"
import { useHistory } from "react-router-dom";

function FindCountryFlag() {

  /////////////////////////////////////////////////////////////////////// Sujet de l'évaluation ///////////////////////////////////////////////////////////////////////
  const [listePays, setlistePays] = useState({
    p1: "Russie",
    p2: "France",
    p3: "Italie",
    p4: "Japon",
    p5: "Chine",
    p6: "Allemagne",
    p7: "Espagne",
    p8: "Royaume-Unis",
    p9: "Portugual",
    p10: "États-Unis"
  })

  /////////////////////////////////////////////////////////////////////// Analyse des réponses ///////////////////////////////////////////////////////////////////////
  const [reponses, setResponses] = useState({
    p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "", p10: ""
  })

  const [nbError, setNbError] = React.useState(0)

  const { authState, authDispatch } = React.useContext(AuthContext)
  const { childState, childDispatch } = React.useContext(ChildContext)

  const [submit, setSubmit] = React.useState(false)
  const history = useHistory();
  function checkValue() {
    var nbError = 0;
    var name = ""
    for (var i = 1; i <= 10; i++) {
      name = "p" + i
      if (listePays[name] != reponses[name]) {
        nbError++;
      }
    }
    return nbError;
  }

  const handleChange = evt => {
    const name = evt.target.name;
    const value = evt.target.value;

    setResponses({
      ...reponses,
      [name]: value
    })
  }

  /////////////////////////////////////////////////////////////////////// Affichage des résultats ///////////////////////////////////////////////////////////////////////

  const handleSubmit = e => {
    var nbError = checkValue()
    if (nbError > 3) {
      alert('Vous avez fait trop de faute pour regarder une vidéo. Votre score ' + (10 - nbError) + '/10')
    } else {
      alert('Bravo ! Tu as le droit de regarder une vidéo. Votre score ' + (10 - nbError) + '/10')
    }
    e.preventDefault()
    setSubmit(true)
    setNbError(nbError)
  }

  /////////////////////////////////////////////////////////////////////// Ajout de tokens si bonnes réponses ///////////////////////////////////////////////////////////////////////
  React.useEffect(() => {
    const sendExam = () => {
      axios({
        method: "PUT",
        url: "/api/v1/users/updateToken/" + authState.id,
        headers: { Authorization: "Bearer " + authState.token },
        data: { amount: 1 }
      })
        .then((res) => {
          authDispatch({ type: "updateToken", payload: res.data.newTokenAmount })
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
    <div>
      <form style={{ display: "flex", flexWrap: "wrap", flexDirection: "column", padding: "15px", margin: "15px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img src="https://img.icons8.com/emoji/144/000000/russia-emoji.png" /><input type="text" name="p1" onChange={handleChange} style={{ height: "40px", marginTop: "auto", marginBottom: "auto" }}></input><br />
          <img src="https://img.icons8.com/emoji/144/000000/france-emoji.png" /><input type="text" name="p2" onChange={handleChange} style={{ height: "40px", marginTop: "auto", marginBottom: "auto" }}></input><br />
          <img src="https://img.icons8.com/emoji/144/000000/italy-emoji.png" /><input type="text" name="p3" onChange={handleChange} style={{ height: "40px", marginTop: "auto", marginBottom: "auto" }}></input><br /></div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img src="https://img.icons8.com/emoji/144/000000/japan-emoji.png" /><input type="text" name="p4" onChange={handleChange} style={{ height: "40px", marginTop: "auto", marginBottom: "auto" }}></input><br />
          <img src="https://img.icons8.com/emoji/144/000000/china-emoji.png" /><input type="text" name="p5" onChange={handleChange} style={{ height: "40px", marginTop: "auto", marginBottom: "auto" }}></input><br />
          <img src="https://img.icons8.com/emoji/144/000000/germany-emoji.png" /><input type="text" name="p6" onChange={handleChange} style={{ height: "40px", marginTop: "auto", marginBottom: "auto" }}></input><br />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img src="https://img.icons8.com/emoji/144/000000/spain-emoji.png" /><input type="text" name="p7" onChange={handleChange} style={{ height: "40px", marginTop: "auto", marginBottom: "auto" }}></input><br />
          <img src="https://img.icons8.com/emoji/144/000000/united-kingdom-emoji.png" /><input type="text" name="p8" onChange={handleChange} style={{ height: "40px", marginTop: "auto", marginBottom: "auto" }}></input><br />
          <img src="https://img.icons8.com/emoji/144/000000/portugal-emoji.png" /><input type="text" name="p9" onChange={handleChange} style={{ height: "40px", marginTop: "auto", marginBottom: "auto" }}></input><br />
          <img src="https://img.icons8.com/color/144/000000/usa.png" /><input type="text" name="p10" onChange={handleChange} style={{ height: "40px", marginTop: "auto", marginBottom: "auto" }}></input><br />
        </div>




        <Button variant="contained" color="primary" onClick={handleSubmit}>Envoyer mes réponses</Button><br />
      </form>
    </div>
  )
}

export default FindCountryFlag