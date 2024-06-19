export function displayLightbox({ medias }) {
    // On cible les divers éléments du DOM pour la lightbox
    const lightbox = document.querySelector('.lightbox');
    const lightboxMedia = document.querySelector('.lightbox_media');
    const lightboxTitle = document.querySelector('.lightbox_title');
    const btnClose = document.querySelector('.lightbox_close');
    const btnPrevious = document.querySelector('.lightbox_prev');
    const btnNext = document.querySelector('.lightbox_next');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery-item .item'));

    let currentIndex = null;

    // Fonction pour ouvrir la lightbox
    const openLightbox = (index) => {
        const main = document.getElementById('main');
        main.setAttribute('aria-hidden', 'true');
        lightbox.setAttribute('aria-hidden', 'false');
        const body = document.body;
        body.classList.add('no-scroll');
        lightbox.style.display = 'flex';
        // On empêche le défilement de la page quand la lightbox est ouverte
        // document.body.style.overflow = 'hidden';
        // On met le focus sur le bouton de fermeture
        btnClose.focus();
        updateLightboxContent(index);
    };

    // Fonction pour fermer la lightbox
    const closeLightbox = () => {
        const main = document.getElementById('main');
        main.setAttribute('aria-hidden', 'false');
        lightbox.setAttribute('aria-hidden', 'true');
        // Au clic sur la X on passe la lightbox en display none
        lightbox.style.display = 'none';
        const body = document.body;
        body.classList.remove('no-scroll');
        // On rétablit le défilement de la page
    };

    // Fonction pour mettre à jour le contenu de la lightbox
    const updateLightboxContent = (index) => {
        const selectedMedia = medias[index];
        if (selectedMedia) {
            // Afficher le contenu du média dans la lightbox en fonction de son type (image ou vidéo)
            if (selectedMedia.image) {
                lightboxMedia.innerHTML = `<img src="assets/media/${selectedMedia.image}" alt="${selectedMedia.title}" role="img">`;
            } else if (selectedMedia.video) {
                lightboxMedia.innerHTML = `<video controls><source src="assets/media/${selectedMedia.video}" type="video/mp4" role="video"></video>`;
                const videoElement = lightboxMedia.querySelector('video');
                videoElement.addEventListener('click', () => {
                    videoElement.play();
                });
                // Ajouter l'attribut controls pour afficher les contrôles de la vidéo
                videoElement.setAttribute('controls', '');
            }
            // Mettre à jour le titre de la lightbox avec le titre du média
            lightboxTitle.textContent = selectedMedia.title;
            currentIndex = index;
        }
    };

    // Fonction pour passer au média suivant
    const nextMedia = () => {
        currentIndex = (currentIndex + 1) % medias.length;
        updateLightboxContent(currentIndex);
    };

    // Fonction pour passer au média précédent
    const previousMedia = () => {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        updateLightboxContent(currentIndex);
    };

    // On écoute le clic sur les items de gallery item
    mediaProvider.forEach((media) => {
        media.setAttribute('role', 'button');
        media.setAttribute('tabindex', '0');
        media.addEventListener('click', () => {
            const mediaId = media.getAttribute('data-media');
            currentIndex = medias.findIndex(m => m.id == mediaId);
            openLightbox(currentIndex);
        });

        media.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const mediaId = media.getAttribute('data-media');
                currentIndex = medias.findIndex(m => m.id == mediaId);
                openLightbox(currentIndex);
            }
        });
    });

    // On écoute les clics sur les boutons fermer, précédent, prochain
    btnPrevious.addEventListener('click', previousMedia);
    btnNext.addEventListener('click', nextMedia);
    btnClose.addEventListener('click', closeLightbox);

    // Défilement du carousel avec le clavier
    document.addEventListener('keyup', (e) => {
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
