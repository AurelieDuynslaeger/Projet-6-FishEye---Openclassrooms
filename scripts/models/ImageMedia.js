import Media from './Media.js';

class ImageMedia extends Media {
    constructor(data) {
        super(data);
        this._image = data.image;
    }

    get mediaLink() {
        return `./assets/media/${this._image}`;
    }

    get mediaContent() {
        const media = document.createElement('img');
        media.setAttribute('alt', `picture named ${this._title}`);
        media.setAttribute('data-media', this._id);
        media.setAttribute('tabindex', '0');
        media.setAttribute('src', this.mediaLink);
        return media;
    }
}

export default ImageMedia;
