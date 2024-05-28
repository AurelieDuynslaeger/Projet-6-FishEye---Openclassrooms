import MediasFactory from "../factories/MediasFactory.js";

export function displayLightbox({ photographer, medias }) {
    // On cible les divers éléments du DOM pour la lightbox
    const lightbox = document.querySelector('.lightbox');
    const lightboxMedia = document.querySelector('.lightbox_media');
    const lightboxTitle = document.querySelector('.lightbox_title');
    const btnClose = document.querySelector('.lightbox_close');
    const btnPrevious = document.querySelector('.lightbox_prev');
    const btnNext = document.querySelector('.lightbox_next');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery-item .item'));

    let currentIndex = null;

    // On écoute le clic sur les items de gallery item
    mediaProvider.forEach((media, index) => {
        media.addEventListener('click', () => {
            const mediaId = media.getAttribute('data-media');
            currentIndex = medias.findIndex(media => media.id == mediaId);
            openLightbox(currentIndex);
        });
    });

    // Ouverture de la lightbox
    const openLightbox = (index) => {
        lightbox.style.display = 'flex';
        // On empêche le défilement de la page quand la lightbox est ouverte
        document.body.style.overflow = 'hidden';
        // On met le focus sur le bouton de fermeture
        btnClose.focus();
        updateLightboxContent(index);
    };

    // Fermeture de la lightbox
    const closeLightbox = () => {
        // Au clic sur la X on passe la lightbox en display none
        lightbox.style.display = 'none';
        // On rétablit le défilement de la page
        document.body.style.overflow = '';
    };

    // Mise à jour du contenu de la lightbox
    const updateLightboxContent = (index) => {
        const selectedMedia = medias[index];
        if (selectedMedia) {
            // Afficher le contenu du média dans la lightbox en fonction de son type (image ou vidéo)
            if (selectedMedia.image) {
                lightboxMedia.innerHTML = `<img src="assets/media/${selectedMedia.image}" alt="${selectedMedia.title}">`;
            } else if (selectedMedia.video) {
                lightboxMedia.innerHTML = `<video controls><source src="assets/media/${selectedMedia.video}" type="video/mp4"></video>`;
            }
            // Mettre à jour le titre de la lightbox avec le titre du média
            lightboxTitle.textContent = selectedMedia.title;
            currentIndex = index;
        }
    };

    // Passer au média suivant
    const nextMedia = () => {
        currentIndex = (currentIndex + 1) % medias.length;
        updateLightboxContent(currentIndex);
    };

    // Passer au média précédent
    const previousMedia = () => {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        updateLightboxContent(currentIndex);
    };

    // On écoute les clics sur les boutons fermer, précédent, prochain
    btnPrevious.addEventListener('click', previousMedia);
    btnNext.addEventListener('click', nextMedia);
    btnClose.addEventListener('click', closeLightbox);

    // Défilement du carousel avec le clavier
    // On écoute les keyup sur Escape pour fermer, flèche gauche pour précédent média, et flèche droite pour prochain média
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
