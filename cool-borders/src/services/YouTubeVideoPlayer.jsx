import React from 'react';
import YouTube from 'react-youtube';

function YouTubeVideoPlayer({ url }) {

    function extractVideoId(link) {
        let videoId = '';

        // Überprüfen, ob der Link das Format 'https://www.youtube.com/watch?v=...' hat
        if (link.includes('youtube.com/watch')) {
            const urlParams = new URLSearchParams(link.split('?')[1]);
            videoId = urlParams.get('v');
        }

        // Überprüfen, ob der Link das Format 'https://youtu.be/...' hat
        if (link.includes('youtu.be/')) {
            videoId = link.split('/').pop();
        }

        return videoId;
    };


    const videoId = extractVideoId(url);


    const options = {
        width: '100%',
        height: '400',
        playerVars: {
            autoplay: 0,
        },
    };

    return (

        <YouTube className='w-full' videoId={videoId} opts={options} />

    );
}

export default YouTubeVideoPlayer;
