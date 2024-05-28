export function displayLightbox({ photographer, medias }) {
    //on cible les divers elements du dom pour la lighbox
    const lightbox = document.querySelector('.lightbox');
    const lightboxMedia = document.querySelector('.lightbox_media');
    const lightboxTitle = document.querySelector('.lightbox_title');
    const btnClose = document.querySelector('.lightbox_close');
    const btnPrevious = document.querySelector('.lightbox_prev');
    const btnNext = document.querySelector('.lightbox_next');
    //le media provider reste gallery-item sur lequel l'utilisateur poourra clicker
    const mediaProvider = Array.from(document.querySelectorAll('.gallery-item'));

    //index que l'on assigne à 0 (qui sera utilisé pour next ou prev)
    let currentIndex = 0;

    //pour chaque média de on ecoute le clik
    mediaProvider.forEach((media, index) => {
        media.addEventListener('click', () => {
            currentIndex = index;
            //au clik on ouvre la light box
            openLightbox();
            //on met à jour le contenu de la lightbox
            updateLightboxContent();
        });
    });

    //ouverture de la lightbox
    const openLightbox = () => {
        lightbox.style.display = 'flex';
        //on empeche le défilement de la page quand la lightbox est ouverte
        document.body.style.overflow = 'hidden';
        //on met le focux sur le bouton de fermeture
        btnClose.focus();
    };

    //fermture de la lightbox
    const closeLightbox = () => {
        //au clik sur la X on passe la lightbox en display non
        lightbox.style.display = 'none';
        //on rétablit le défilement de la page
        document.body.style.overflow = '';
    };

    //mise à jour du contenu de la lightbox
    const updateLightboxContent = () => {
        const media = medias[currentIndex];
        if (media && (media.image || media.video)) { // 
            if (media.image) {
                lightboxMedia.innerHTML = `<img src="assets/media/${media.image}" alt="${media.title}">`;
            } else if (media.video) {
                lightboxMedia.innerHTML = `<video controls><source src="assets/media/${media.video}" type="video/mp4"></video>`;
            }
            lightboxTitle.textContent = `${media.title}`;
        } else {
            console.error("Le média actuel est invalide ou ne contient pas de contenu image ou vidéo.");
        }
    };

    //passer au média suivant
    const nextMedia = () => {
        currentIndex = (currentIndex + 1) % medias.length;
        //mise à jour du contenu
        updateLightboxContent();
    };

    //passer au média précédent
    const previousMedia = () => {
        currentIndex = (currentIndex - 1 + medias.length) % medias.length;
        //mise à jour du contenu 
        updateLightboxContent();
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
    btnPrevious.addEventListener('click', previousMedia);
    btnNext.addEventListener('click', nextMedia);
    btnClose.addEventListener('click', closeLightbox);
}
