import axios from 'axios';
const KEY = 'AIzaSyCkcdQa7VpeeVtNdMBIZXp0iwKdHTS7iqY';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 20,
        key: KEY,
        type: 'video',
        safeSearch:'strict'
    }
})