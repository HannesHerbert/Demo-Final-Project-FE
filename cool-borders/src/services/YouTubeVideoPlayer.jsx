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

    console.log(window.screen.width);

    const playerWidth = window.screen.width/2
    const playerHeight = playerWidth / 16 * 9

    const videoId = extractVideoId(url);


    const options = {
        width: playerWidth,
        height: playerHeight,
        playerVars: {
            autoplay: 0,
        },
    };

    return (

        <YouTube videoId={videoId} opts={options} />

    );
}

export default YouTubeVideoPlayer;
