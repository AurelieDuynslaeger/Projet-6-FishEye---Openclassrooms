export function displayLightbox({ medias }) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxMedia = document.querySelector('.lightbox_media');
    const lightboxTitle = document.querySelector('.lightbox_title');
    const btnClose = document.querySelector('.lightbox_close');
    const btnPrevious = document.querySelector('.lightbox_prev');
    const btnNext = document.querySelector('.lightbox_next');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery-item .item'));

    let currentIndex = null;

    const openLightbox = (index) => {
        const main = document.getElementById('main');
        main.setAttribute('aria-hidden', 'true');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
        lightbox.style.display = 'flex';
        btnClose.focus();
        updateLightboxContent(index);
    };

    const closeLightbox = () => {
        const main = document.getElementById('main');
        main.setAttribute('aria-hidden', 'false');
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.style.display = 'none';
        document.body.classList.remove('no-scroll');
    };

    const updateLightboxContent = (index) => {
        const selectedMedia = medias[index];
        if (selectedMedia) {
            if (selectedMedia.image) {
                lightboxMedia.innerHTML = `<img src="assets/media/${selectedMedia.image}" alt="${selectedMedia.title}" role="img">`;
            } else if (selectedMedia.video) {
                lightboxMedia.innerHTML = `<video controls><source src="assets/media/${selectedMedia.video}" type="video/mp4" role="video"></video>`;
                const videoElement = lightboxMedia.querySelector('video');
                videoElement.addEventListener('click', () => {
                    videoElement.play();
                });
                videoElement.setAttribute('controls', '');
            }
            lightboxTitle.textContent = selectedMedia.title;
            currentIndex = index;
        }
    };

    const nextMedia = () => {
        currentIndex = (currentIndex + 1) % medias.length;
        updateLightboxContent(currentIndex);
    };

    const previousMedia = () => {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        updateLightboxContent(currentIndex);
    };

    mediaProvider.forEach((media) => {
        media.addEventListener('click', () => {
            const mediaId = media.getAttribute('data-media');
            currentIndex = medias.findIndex(m => m.id == mediaId);
            openLightbox(currentIndex);
        });

        media.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const mediaId = media.getAttribute('data-media');
                currentIndex = medias.findIndex(m => m.id == mediaId);
                openLightbox(currentIndex);
            }
        });
    });

    btnPrevious.addEventListener('click', previousMedia);
    btnNext.addEventListener('click', nextMedia);
    btnClose.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
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
        }
    });
}
