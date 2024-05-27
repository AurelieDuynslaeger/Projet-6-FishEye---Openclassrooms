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