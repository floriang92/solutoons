import React from 'react';

const VideoDetail = ({video}) => {
    if (!video) {
        return <div>Loading ...</div>;
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
        <div>
            <div style={{display:"flex"}}>
                <iframe src={videoSrc} allowFullScreen title='Video player' style={{width:"80%", height:"500px", margin:"auto"}}/>
            </div>
            <div style={{backgroundColor:"#023047"}}>
                <p style={{color:"#fff"}}>{video.snippet.description}</p>
            </div>
        </div>

    )
}

export default VideoDetail;