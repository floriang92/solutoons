import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../Components/Table/Table";
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import axios from 'axios'
import { Link } from "react-router-dom";


export default function Dashboard() {
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

  return (
    <div>
      <h2>Mes films</h2>
      <div>
      <Carousel 
      className={classes.carousel}
  plugins={[
    'infinite',
    'arrows',
    {
      resolve: slidesToShowPlugin,
      options: {
       numberOfSlides: 6
      }
    },
  ]}
>
<Link to="/ProfilPage">
<img src={process.env.PUBLIC_URL + '/Images/logoSansFond.jpg'} />
</Link>
<Link to="/ProfilPage">
<img src={process.env.PUBLIC_URL + '/Images/logoSansFond.jpg'} />
</Link>
<Link to="/ProfilPage">
<img src={process.env.PUBLIC_URL + '/Images/logoSansFond.jpg'} />
</Link>
</Carousel>

<Carousel 
      className={classes.carousel}
  plugins={[
    'infinite',
    'arrows',
    {
      resolve: slidesToShowPlugin,
      options: {
       numberOfSlides: 6
      }
    },
  ]}
>
  <img src={process.env.PUBLIC_URL + '/Images/logoSansFond.jpg'} />
  <img src={process.env.PUBLIC_URL + '/Images/logoSansFond.jpg'} />
  <img src={process.env.PUBLIC_URL + '/Images/logoSansFond.jpg'} />
</Carousel>
      </div>
     
    </div>
  );
}
