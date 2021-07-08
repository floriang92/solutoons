import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import '@brainhubeu/react-carousel/lib/style.css';
import axios from 'axios'
import SearchBar from "material-ui-search-bar";
import Youtube from "../Components/Youtube/youtube"
import VideoItem from "../Components/Youtube/VideoItem";
import ModalLoader from "../Modal/Modalloader";
import { AuthContext } from "../Store/AuthContext";

export default function Dashboard() {

  /////////////////////////////////////////////////////////////////////// CSS ///////////////////////////////////////////////////////////////////////

  const useStyles = makeStyles((theme) => ({
    container: {
      justifyContent: "space-evenly",
      display: "flex",
      flexDirection: "row",
      marginTop: "5vh",
      flexWrap: "wrap",
    },
    videoContainer: {
      justifyContent: "space-evenly",
      display: "flex",
      flexDirection: "row",
      marginTop: "5vh",
      flexWrap: "wrap",
      backgroundColor:"#FFB703"
    },
    containerMapAndChart: {
      paddingRight: "15px",
    },
    containerGraph: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
    },
    carousel: {
      width: "95vw"
    },
    searchbar: {
      width:"60%",
      margin:"auto",
      borderRadius:"20px"
    }
  }));

  /////////////////////////////////////////////////////////////////////// Variables Setup ///////////////////////////////////////////////////////////////////////
  const [videoState, setVideoState] = React.useState({
    videos: [],
    selectedVideo: null
  })
  const { authState, authDispatch } = React.useContext(AuthContext)
  const [searchedText, setSearchedText] = React.useState('')
  const [clicked, setClicked] = React.useState(false)
  const [renderedVideos, setRenderedVideos] = React.useState(null)

  /////////////////////////////////////////////////////////////////////// Fonction Setup ///////////////////////////////////////////////////////////////////////
  // Recherches via searchbar
  const handleSubmit = async (termFromSearchBar) => {
    const response = await Youtube.get('/search', {
      params: {
        q: termFromSearchBar
      }
    })
    setVideoState({
      videos: response.data.items
    })
    setRenderedVideos(response.data.items.map((video) => {
      return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} /> })
    )
    console.log(response.data.items.map((video) => {
      return <VideoItem key={video.id.videoId} video={video} handleVideoSelect={handleVideoSelect} /> }))

    
  };

  //Actualisation des crédits + affichage vidéo quand on clique dessus
  const handleVideoSelect = (video) => {
    setVideoState({ selectedVideo: video })
    if (authState.availableTokens >= 0) {
      axios({
        method: "PUT",
        url: "/api/v1/users/updateToken/" + authState.id,
        headers: { Authorization: "Bearer " + authState.token },
        data: {amount: -1}
      })
        .then((res) => {
          authDispatch({type:"updateToken", payload:res.data.newTokenAmount})
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
    setClicked(true)
  }
  const classes = useStyles();

  /////////////////////////////////////////////////////////////////////// Affichage du contenu du dashboard ///////////////////////////////////////////////////////////////////////

  return (
    <div >
      <h2 style={{fontFamily:"cursive"}}>Il me reste {authState.availableTokens > 1 ? authState.availableTokens : 0} vidéos à regarder</h2>
      <div>
      {clicked ? authState.availableTokens > 0 ? <ModalLoader form={"load-video"} onlyModal={true} setClicked={setClicked} video={videoState.selectedVideo}/> : <ModalLoader form={"warning-tokens"} onlyModal={true} setClicked={setClicked}/> : null}
        <SearchBar
          value={searchedText}
          onChange={(newValue) => setSearchedText(newValue)}
          onRequestSearch={() => handleSubmit(searchedText)}
          className={classes.searchbar}
        />
        <div className={classes.videoContainer} >
          {renderedVideos ? renderedVideos.map((video) => (video)) : <img src="/Images/PngLogo.png" style={{backgroundColor:"#eee", borderRadius:"100px"}} />}
        </div>
      </div>

    </div>
  );
}
