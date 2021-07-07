import React from 'react';
import axios from "axios"

const VideoDetail = ({video}) => {
    if (!video) {
        return <div>Loading ...</div>;
    }
    else {
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:5000/api/v1/users/login',
        //     data: user
        //   })
        //     .then((res) => {
        //       authDispatch({ type: 'login', payload: res.data })
        //       childDispatch({ type: "UpdateToken", payload: res.data.user.availableTokens})
        //       console.log(res.data)
        //       // console.log('test',res.data.accessToken)
        //     })
        //     .catch((err) => {
        //       console.log(err)
        //     })
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