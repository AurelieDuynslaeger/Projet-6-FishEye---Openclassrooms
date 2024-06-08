import { displayLightbox } from "../utils/lightbox.js";
import { getPhotographers, getMedias } from '../utils/data.js';
import { handleSortChange } from '../utils/sort.js';
import { initializeTotalLikes, updateTotalLikes } from "../utils/likes.js";

import { bannerPhotographer } from "../templates/bannerPhotographer.js";
import { mediaItemPhotographer } from "../templates/mediaItemPhotographer.js";


// Variable pour stocker les informations du photographe
let currentPhotographer = null;
//contenu affiché selon le tri ou non
let currentMedias = [];

//récuperer l'id véhiculé dans l'url
document.addEventListener("DOMContentLoaded", async () => {
    //on vient regarder dans l'url le param id
    const paramUrl = new URLSearchParams(window.location.search);
    // console.log(paramUrl);
    const idPhotograh = paramUrl.get('id');
    // console.log(idPhotograh);

    //si un id est trouvé
    if (idPhotograh) {
        //on lance le fetch photographers
        const { photographers } = await getPhotographers();
        //on vient trouver dans photographers, l'id qui correspond à l'id de l'url
        const photographer = photographers.find(photograph => photograph.id == idPhotograh);
        //si le photographe est trouvé
        if (photographer) {
            currentPhotographer = photographer;
            //on affiche le banner du photographe
            bannerPhotographer(currentPhotographer);
            const { medias } = await getMedias();
            const photographerMedias = medias.filter(media => media.photographerId == idPhotograh);
            //on affiche sa gallerie de médias
            displayPhotographerMedia(photographer, photographerMedias);
        } else {
            console.error("Photographe inconnu")
        }
    }
});


// Fonction pour afficher les médias d'un photographe
function displayPhotographerMedia(photographer, medias) {
    currentMedias = medias;
    const section = document.querySelector('.photograph-gallery');
    section.innerHTML = '';

    medias.forEach((media) => {
        //template item medias
        mediaItemPhotographer(media, () => updateTotalLikes(medias));
    });

    initializeTotalLikes(photographer, medias);
    displayLightbox({ medias });
}


//cibler le select
const sortSelect = document.getElementById("sortSelect");

//écouteur d'event pour le changement de sélection
sortSelect.addEventListener("change", (event) => handleSortChange(event, currentPhotographer, currentMedias, displayPhotographerMedia));
