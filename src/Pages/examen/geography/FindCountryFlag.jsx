import React, {useState} from 'react'
import Button from "@material-ui/core/Button";

function FindCountryFlag() {
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

    const [reponses, setResponses] = useState({
        p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "", p10: ""
    })

    function checkValue(){
        var nbError = 0;
        var name = ""
        for(var i = 1; i <= 10; i++ ){
            name = "p"+i
            if(listePays[name] != reponses[name]){
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

    const handleSubmit = e => {
        var nbError = checkValue()
        if(nbError > 3){
            alert('Vous avez fait trop de faute pour regarder une vidéo. Votre score'+ (10-nbError)+'/10' )
        }else {
            alert('Bravo ! Tu as le droit de regarder une vidéo. Votre score'+ (10-nbError)+'/10' )
        }
        e.preventDefault()
        //insert add token
    }

    return (
        <div>
            <form>
                <img src="https://img.icons8.com/emoji/144/000000/russia-emoji.png" /><span>=></span><input type="text" name="p1" onChange={handleChange}></input><br />
                <img src="https://img.icons8.com/emoji/144/000000/france-emoji.png" /><span>=></span><input type="text" name="p2" onChange={handleChange}></input><br />
                <img src="https://img.icons8.com/emoji/144/000000/italy-emoji.png" /><span>=></span><input type="text" name="p3" onChange={handleChange}></input><br />
                <img src="https://img.icons8.com/emoji/144/000000/japan-emoji.png" /><span>=></span><input type="text" name="p4" onChange={handleChange}></input><br />
                <img src="https://img.icons8.com/emoji/144/000000/china-emoji.png" /><span>=></span><input type="text" name="p5" onChange={handleChange}></input><br />
                <img src="https://img.icons8.com/emoji/144/000000/germany-emoji.png"/><span>=></span><input type="text" name="p6" onChange={handleChange}></input><br />
                <img src="https://img.icons8.com/emoji/144/000000/spain-emoji.png"/><span>=></span><input type="text" name="p7" onChange={handleChange}></input><br />
                <img src="https://img.icons8.com/emoji/144/000000/united-kingdom-emoji.png"/><span>=></span><input type="text" name="p8" onChange={handleChange}></input><br />
                <img src="https://img.icons8.com/emoji/144/000000/portugal-emoji.png"/><span>=></span><input type="text" name="p9" onChange={handleChange}></input><br />
                <img src="https://img.icons8.com/color/144/000000/usa.png"/><span>=></span><input type="text" name="p10" onChange={handleChange}></input><br />
                <Button variant="contained" color="primary" onClick={ handleSubmit }>Envoyer mes réponses</Button><br/>
            </form>
        </div>
    )
}

export default FindCountryFlag