import MediasFactory from "../factories/MediasFactory.js";
import { getMediaById } from "../factories/MediasFactory.js";

export function displayLightbox({ photographer, medias }) {
    //on cible les divers elements du dom pour la lighbox
    const lightbox = document.querySelector('.lightbox');
    const lightboxMedia = document.querySelector('.lightbox_media');
    const lightboxTitle = document.querySelector('.lightbox_title');
    const btnClose = document.querySelector('.lightbox_close');
    const btnPrevious = document.querySelector('.lightbox_prev');
    const btnNext = document.querySelector('.lightbox_next');
    //le media provider reste gallery-item sur lequel l'utilisateur poourra clicker
    const mediaProvider = Array.from(document.querySelectorAll('.item'));
    console.log(mediaProvider);

    //on écoute le clik sur les items de gallery item
    mediaProvider.forEach((media) => {
        media.addEventListener('click', () => {
            const mediaId = media.getAttribute('data-media');
            openLightbox(mediaId);
            console.log(mediaId);
        });
    });

    //ouverture de la lightbox
    const openLightbox = (mediaId) => {
        lightbox.style.display = 'flex';
        //on empeche le défilement de la page quand la lightbox est ouverte
        document.body.style.overflow = 'hidden';
        //on met le focux sur le bouton de fermeture
        btnClose.focus();
        updateLightboxContent(mediaId)
    };

    //fermture de la lightbox
    const closeLightbox = () => {
        //au clik sur la X on passe la lightbox en display non
        lightbox.style.display = 'none';
        //on rétablit le défilement de la page
        document.body.style.overflow = '';
    };

    //mise à jour du contenu de la lightbox
    const updateLightboxContent = (mediaId) => {
        const selectedMedia = medias.find(media => media.id == mediaId);
        if (selectedMedia) {
            // Afficher le contenu du média dans la lightbox en fonction de son type (image ou vidéo)
            if (selectedMedia.image) {
                lightboxMedia.innerHTML = `<img src="assets/media/${selectedMedia.image}" alt="${selectedMedia.title}">`;
            } else if (selectedMedia.video) {
                lightboxMedia.innerHTML = `<video controls><source src="assets/media/${selectedMedia.video}" type="video/mp4"></video>`;
            }
            // Mettre à jour le titre de la lightbox avec le titre du média
            lightboxTitle.textContent = selectedMedia.title;
        }
    };
    //passer au média suivant
    const nextMedia = (selectedMedia) => {
        currentIndex = (currentIndex + 1) % medias.length;
        updateLightboxContent(selectedMedia);
    };

    //passer au média précédent
    const previousMedia = (selectedMedia) => {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        updateLightboxContent(selectedMedia);
    };

    //défilement du carousel avec le clavier
    //on écoute les key up sur esacpe pour fermer, fleche gauche pour précédent média, et fleche droite pour prochain média
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
        }
    });

    //on écoute les click sur les btn fermer, précédent, prochain
    btnPrevious.addEventListener('click', () => previousMedia(medias[currentIndex]));
    btnNext.addEventListener('click', () => nextMedia(medias[currentIndex]));
    btnClose.addEventListener('click', closeLightbox);
}
