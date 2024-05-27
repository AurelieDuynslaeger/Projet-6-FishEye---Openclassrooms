export const displayLightbox = medias => {

    const lightbox = document.querySelector('.lightbox');
    const btnClose = document.querySelector('.lightbox_close');
    const btnPrevious = document.querySelector('.lightbox_prev');
    const btnNext = document.querySelector('.lightbox_next');
    const lightboxMedia = document.querySelector('.lightbox_container');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery_card a'));

    const photographer = medias.photographer;
    const mediasList = medias.medias;
    let currentIndex = 0;

    mediaProvider.forEach(media => {
        media.addEventListener('click', () => {
            const mediaId = media.dataset.media;
            const mediaIndex = mediasList.findIndex(media => media.id == mediaId);
            currentIndex = mediaIndex;
            lightbox.style.display = 'flex';
            btnClose.focus();
            lightboxTemplate();
        });
    });

    const lightboxTemplate = () => {
        const media = mediasList[currentIndex];
        if (media.image) {
            lightboxMedia.innerHTML = `<img src="assets/media/${media.image}" alt="${media.title}">`;
        } else if (media.video) {
            lightboxMedia.innerHTML = `<video controls><source src="assets/media/${media.video}" type="video/mp4"></video>`;
        }
        const lightboxTitle = document.querySelector('.lightbox_title');
        lightboxTitle.textContent = media.title;
    };

    const closeLightbox = () => {
        lightbox.style.display = 'none';
    };

    const nextMedia = () => {
        currentIndex = (currentIndex - 1 + mediasList.length) % mediasList.length;
        lightboxTemplate();
    };

    const previousMedia = () => {

    };



    document.addEventListener('keyup', e => {
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousMedia();
                break;
            case 'ArrowRight':
                nextMedia();
                break;
        };
    });

    btnPrevious.addEventListener('click', () => previousMedia());
    btnNext.addEventListener('click', () => nextMedia());
    btnClose.addEventListener('click', () => closeLightbox());
};