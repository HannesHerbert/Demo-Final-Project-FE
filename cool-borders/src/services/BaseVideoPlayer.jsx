



function BaseVideoPlayer({ url }) {

    let mimeType;

    if (url.substring(url.lastIndexOf('.'), url.length) === '.mp4') {
        mimeType = 'video/mp4'
    } else {
        mimeType = url.substring(url.indexOf(':') + 1, url.indexOf(";"))
    };
    
    console.log(mimeType);

    return (
        <div>
            <video controls>
                <source src={url} type={mimeType} />
            </video>
        </div>

    )
}


export default BaseVideoPlayer

