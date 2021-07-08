import React from 'react';
import '../../assets/css/video.css';
import he from "he"


const VideoItem = ({video , handleVideoSelect}) => {
    ///////////////////////////////////////////////////////////////////////Affichage d'une vidéo sur la page d'accueil///////////////////////////////////////////////////////////////////////
    return (
        <div onClick={ () => handleVideoSelect(video)} className='video-item' style={{width: video.snippet.thumbnails.high.width}}>
            <img className='image_video' style={{width: video.snippet.thumbnails.high.width, height: video.snippet.thumbnails.high.height}} src={video.snippet.thumbnails.high.url} alt={he.decode(video.snippet.description)}/>
                <div className='header ' style={{width: video.snippet.thumbnails.high.width}}>
                    <p className="title">{he.decode(video.snippet.title)}</p>
                </div>
        </div>
    )
};
export default VideoItem;