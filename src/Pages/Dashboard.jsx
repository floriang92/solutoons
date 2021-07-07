import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../Components/Table/Table";
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import axios from 'axios'
import { Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import Youtube from "../Components/Youtube/youtube"
import VideoList from "../Components/Youtube/VideoList";
import VideoDetail from "../Components/Youtube/VideoDetails";
import VideoItem from "../Components/Youtube/VideoItem";
import ModalLoader from "../Modal/Modalloader";
import { ChildContext } from "../Store/ChildContext";
import { AuthContext } from "../Store/AuthContext";

export default function Dashboard() {
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
  const [videoState, setVideoState] = React.useState({
    videos: [],
    selectedVideo: null
  })
  const { authState, authDispatch } = React.useContext(AuthContext)
  const [searchedText, setSearchedText] = React.useState('')
  const [clicked, setClicked] = React.useState(false)
  const [renderedVideos, setRenderedVideos] = React.useState(null)
  const { childState, childDispatch } = React.useContext(ChildContext)
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

  const handleVideoSelect = (video) => {
    setVideoState({ selectedVideo: video })
    if (authState.availableTokens > 0) {
      axios({
        method: "PUT",
        url: "http://localhost:5000/api/v1/users/updateToken/" + authState.id,
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

  return (
    <div >
      <h2 style={{fontFamily:"cursive"}}>Il me reste {authState.availableTokens > 0 ? authState.availableTokens - 1 : 0} vidéos à regarder</h2>
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
