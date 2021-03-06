import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../Store/AuthContext"
import axios from "axios"
function FormWordsOrder() {

/////////////////////////////////////////////////////////////////////// Sujet de l'évaluation ///////////////////////////////////////////////////////////////////////
    const [phrases, setPhrase] = useState({
        p1: "Je m'appelle Michel",
        p2: "Il y a une église dans le village",
        p3: "Je suis une personne de grande taille",
        p4: "Paris est la plus belle ville du monde",
        p5: "Je pars à Tokyo dans deux mois",
        p6: "Je mange un couscous",
        p7: "La seine est un fleuve",
        p8: "Il y a un arbre dans mon jardin",
        p9: "Je regarde la télévision",
        p10: "Je bois du thé"
    })

/////////////////////////////////////////////////////////////////////// Analyse des réponses ///////////////////////////////////////////////////////////////////////
    const [phrasesToModify, setPhrasesToModify] = useState({
        p1: GetNewWordsOrder(phrases.p1),
        p2: GetNewWordsOrder(phrases.p2),
        p3: GetNewWordsOrder(phrases.p3),
        p4: GetNewWordsOrder(phrases.p4),
        p5: GetNewWordsOrder(phrases.p5),
        p6: GetNewWordsOrder(phrases.p6),
        p7: GetNewWordsOrder(phrases.p7),
        p8: GetNewWordsOrder(phrases.p8),
        p9: GetNewWordsOrder(phrases.p9),
        p10: GetNewWordsOrder(phrases.p10),
    })
    const [reponses, setResponses] = useState({
        p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "", p10: ""
    })
    const [submit, setSubmit] = React.useState(false)
    const { authState, authDispatch } = React.useContext(AuthContext)
    const history = useHistory();
    const [nbError, setNbError] = React.useState(0)

    function GetNewWordsOrder(string) {
        var stringToSplit = string
        var words = stringToSplit.split(" ")
        words.sort(()=> Math.random() - 0.5);
        var newString = words.join(" ")
        return newString
    }
    
    function checkValue(){
        var nbErrors = 0;
        var name = ""
        for(var i = 1; i <= 10; i++ ){
            name = "p"+i
            if(phrases[name] != reponses[name]){
                nbErrors++;
            }
        }
        return nbErrors;
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
        if(nbError > 3){
            alert('Vous avez fait trop de faute pour regarder une vidéo. Votre score '+ (10-nbError)+'/10' )
        }else {
            alert('Bravo ! Tu as le droit de regarder une vidéo. Votre score '+ (10-nbError)+'/10' )
        }
        e.preventDefault()
        setSubmit(true)
        setNbError(nbError)
    }
    
    /////////////////////////////////////////////////////////////////////// Ajout de token si bonne note ///////////////////////////////////////////////////////////////////////
    React.useEffect(() => {
        const sendExam = () => {
          axios({
            method: "PUT",
            url: "/api/v1/users/updateToken/" + authState.id,
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
                <span> {phrasesToModify.p1} </span><input type="text" name="p1" onChange={handleChange} /> <br/>
                <span> {phrasesToModify.p2} </span><input type="text" name="p2" onChange={handleChange} /><br/>
                <span> {phrasesToModify.p3} </span><input type="text" name="p3" onChange={handleChange} /><br/>
                <span> {phrasesToModify.p4} </span><input type="text" name="p4" onChange={handleChange} /><br/>
                <span> {phrasesToModify.p5} </span><input type="text" name="p5" onChange={handleChange} /><br/>
                <span> {phrasesToModify.p6} </span><input type="text" name="p6" onChange={handleChange} /><br/>
                <span> {phrasesToModify.p7} </span><input type="text" name="p7" onChange={handleChange} /><br/>
                <span> {phrasesToModify.p8} </span><input type="text" name="p8" onChange={handleChange} /><br/>
                <span> {phrasesToModify.p9} </span><input type="text" name="p9" onChange={handleChange} /><br/>
                <span> {phrasesToModify.p10} </span><input type="text" name="p10" onChange={handleChange} />   <br/>             
                <Button variant="contained" color="primary" onClick={ handleSubmit }>Envoyer mes réponses</Button><br/>
            </form>
    )
}

export default FormWordsOrder
