import ImageMedia from '../models/ImageMedia.js'
import VideoMedia from '../models/VideoMedia.js'
class MediasFactory {
    constructor(data) {
        if (data.image) {
            return new ImageMedia(data)
        } else if (data.video) {
            return new VideoMedia(data)
        } else {
            throw "Unknow media format type"
        }
    }
}

export function getMediaById(mediaId, medias) {
    if (medias) {
        return medias.find(media => media.id === mediaId);
    } else {
        console.error("Le tableau de médias est vide ou non défini.");
        return null;
    }
}


export default MediasFactory;