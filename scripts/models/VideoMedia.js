class VideoMedia extends Media {
    constructor(data) {
        super(data);
        this._video = data.video;
    }

    // get mediaLink() {
    //     return `./assets/medias/${this._photographerId}/${this._video}`;
    // }

    // get mediaContent() {
    //     const media = document.createElement('video');
    //     media.setAttribute("alt", this._title);
    //     media.setAttribute("card-image", this._id);
    //     media.setAttribute("tabindex", "0");

    //     media.setAttribute("src", this.mediaLink);
    //     media.setAttribute("muted", '');
    //     media.setAttribute("autoplay", '');
    //     media.setAttribute("loop", '');
    //     return media
    // }
}