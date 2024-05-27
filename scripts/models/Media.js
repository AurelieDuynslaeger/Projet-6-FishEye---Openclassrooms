class Media {
    constructor(data) {
        this._id = data.id;
        this._photographerId = data.photographerId;
        this._title = data.title;
        this._likes = data.likes;
        // this._liked = false;
        this._date = data.date;
        this._price = data.price;
    }

    get id() {
        return this._id
    }
    get photographerId() {
        return this._photographerId
    }
    get title() {
        return this._title
    }
    get likes() {
        return this._likes
    }
    get date() {
        return this._date
    }
    get price() {
        return this._price
    }

    // addLike = () => {
    //     this._liked = true;
    //     this._likes += 1;
    // }

    // removeLike = () => {
    //     this._liked = false;
    //     this._likes -= 1;
    // }

    // getTemplateCardDom = () => {
    //     const article = document.createElement('article');
    //     article.classList.add('media-card');

    //     const articleContent = document.createElement('div');
    //     articleContent.classList.add('content');

    //     /// Media Video/Picture
    //     const media = this.mediaContent;

    //     /// Media Name
    //     const mediaName = document.createElement('p');
    //     mediaName.textContent = this._title;
    //     mediaName.classList.add('media-title');
    //     articleContent.appendChild(mediaName);

    //     /// Media Likes
    //     const mediaLikes = document.createElement('button');
    //     mediaLikes.onclick = () => {
    //         mediaLikes.classList.contains('-liked') ? this.removeLike() : this.addLike();
    //         mediaLikes.classList.toggle('-liked');
    //         numberOfLikes.textContent = this.likes;
    //         displayPhotographerTotalLikes();
    //     };
    //     this._liked && mediaLikes.classList.add('-liked');
    //     const numberOfLikes = document.createElement('p');
    //     numberOfLikes.textContent = this.likes;
    //     mediaLikes.appendChild(numberOfLikes);

    //     const heartIcon = document.createElement('img');
    //     heartIcon.setAttribute('src', './assets/icons/heart.svg');
    //     mediaLikes.appendChild(heartIcon);

    //     mediaLikes.classList.add('media-likes');
    //     articleContent.appendChild(mediaLikes);

    //     article.appendChild(media);
    //     article.appendChild(articleContent);
    //     return (article);
    // }
}