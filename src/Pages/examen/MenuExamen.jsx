import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Link } from "react-router-dom";

  
function MenuExamen() { 
  /////////////////////////////////////////////////////////////////////// CSS ///////////////////////////////////////////////////////////////////////
    const useStyles = makeStyles((theme) => ({
        container: {
          justifyContent: "space-evenly",
          display: "flex",
          flexDirection: "row",
          marginTop: "5vh",
          flexWrap: "wrap",
        },
        containerMapAndChart: {
          paddingRight: "15px",
        },
        containerGraph: {
          width: "100%",
          display: "flex",
          flexDirection: "row",
        },
        carousel:{
          width:"95vw"
        }
      }));
      const classes = useStyles();
    
      /////////////////////////////////////////////////////////////////////// Affichage Menu ///////////////////////////////////////////////////////////////////////
      return (
        <div>
          <h2>Sélection de la matière</h2>
          <div>
          <Carousel 
          className={classes.carousel}
      plugins={[
        'infinite',
        'arrows',
        {
          resolve: slidesToShowPlugin,
          options: {
           numberOfSlides: 3
          }
        },
      ]}
    >
    <Link to="/FrenchMenu">
    <img src="https://img.icons8.com/emoji/256/000000/france-emoji.png" />
    </Link>
    <Link to="/MathMenu">
    <img src="https://img.icons8.com/dotty/256/000000/math.png"/>
    </Link>
    <Link to="/GeographyMenu">
    <img src="https://img.icons8.com/bubbles/256/000000/geography.png"/>
    </Link>
    </Carousel>
          </div>
         
        </div>
      );
}

export default MenuExamen