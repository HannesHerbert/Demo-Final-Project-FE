



function BaseVideoPlayer({ baseFile }) {




    return (
        <div>
            <video controls data-setup=''>
                <source src={slide} type='video/mp4' />
            </video>
        </div>

    )
}