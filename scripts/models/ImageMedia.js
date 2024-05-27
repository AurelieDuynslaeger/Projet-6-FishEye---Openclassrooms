class ImageMedia extends Media {
    constructor(data) {
        super(data);
        this._image = data.image;
    }

    // get mediaLink() {
    //     return `./assets/medias/${this._photographerId}/${this._image}`;
    // }

    // get mediaContent() {
    //     const media = document.createElement('img');
    //     media.setAttribute("alt", this._title);
    //     media.setAttribute("card-image", this._id);
    //     media.setAttribute("tabindex", "0");
    //     media.setAttribute("src", this.mediaLink);
    //     return media
    // }
}