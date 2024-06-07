import { displayLightbox } from "../utils/lightbox.js";
import { getPhotographers, getMedias } from '../utils/data.js';
import { handleSortChange } from '../utils/sort.js';
import MediasFactory from "../factories/MediasFactory.js";
import { getTotalLikes } from "../templates/photographer.js"
import { bannerPhotographer } from "../templates/bannerPhotographer.js";

// Variable pour stocker les informations du photographe
let currentPhotographer = null;

//récuperer l'id véhiculé dans l'url
document.addEventListener("DOMContentLoaded", async () => {
    //on vient regarder dans l'url le param id
    const paramUrl = new URLSearchParams(window.location.search);
    console.log(paramUrl);
    const idPhotograh = paramUrl.get('id');
    console.log(idPhotograh);

    //si un id est trouvé
    if (idPhotograh) {
        //on lance le fetch photographers
        const { photographers } = await getPhotographers();
        console.log(photographers); //ok
        //on vient trouver dans photographers, l'id qui correspond à l'id de l'url
        const photographer = photographers.find(photograph => photograph.id == idPhotograh);
        //si le photographe est trouvé
        if (photographer) {
            console.log(photographer);
            currentPhotographer = photographer;
            bannerPhotographer(photographer);
            const { medias } = await getMedias();
            const photographerMedias = medias.filter(media => media.photographerId == idPhotograh);
            console.log(photographerMedias);
            //on display ses infos comme avec displayData

            //le for each serait ici ?? 
            displayPhotographerMedia(photographer, photographerMedias);
        } else {
            console.error("Photographe inconnu")
        }
    }
});



//contenu affiché selon le tri ou non
let currentMedias = [];

//affichage des média d'un photographe par l'id
function displayPhotographerMedia(photographer, medias) {
    //on stocke par défaut les médias récup dans le fetch,
    //l'affichage changera selon le tri ensuite
    currentMedias = medias;
    //on cible la section de photographer.html
    const section = document.querySelector('.photograph-gallery');

    //on efface le contenu actuel (tris)
    section.innerHTML = '';

    //pour chaque média du photographe, on crée une div avec la class "gallery-item";
    medias.forEach((media) => {
        //utilisation de la factory pour le média
        const mediaItem = new MediasFactory(media);
        const itemGallery = document.createElement('div');
        itemGallery.classList.add('gallery-item');

        const item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('data-media', media.id);

        //on utilise mediaContent pour insérer le média (img ou vidéo)
        item.appendChild(mediaItem.mediaContent);

        //titre de l'item
        const itemTitle = document.createElement('h3');
        itemTitle.textContent = media.title;

        const itemLikes = document.createElement('div');
        itemLikes.classList.add('likes');
        const spanrate = document.createElement('div');
        spanrate.classList.add('item-rating');

        const likeIcon = document.createElement('img');
        likeIcon.classList.add('heart-icon');
        //icon Coeur pour les likes
        likeIcon.src = 'assets/icons/heart-item.svg';
        likeIcon.alt = 'Likes';
        //compte des likes
        const likesCount = document.createElement('span');
        likesCount.textContent = media.likes;
        likesCount.classList.add('likes-count');
        itemLikes.appendChild(itemTitle);

        //empêcher les likes multiples
        let likedMediaIds = [];

        //écouteur d'événement sur l'icône pour le compteur de likes qui s'incrémente : 
        likeIcon.addEventListener('click', () => {
            // Vérifier si le média a déjà été liké
            if (!likedMediaIds.includes(media.id)) {
                // Mettre à jour le compteur de likes
                media.likes++;
                likesCount.textContent = media.likes;

                // Ajouter l'identifiant du média à la liste des médias likés
                likedMediaIds.push(media.id);
                //mise à jour du total des likes
                updateTotalLikes(medias);
            }
        });

        //gallery item a pour enfant titre et likes
        spanrate.appendChild(likesCount);
        spanrate.appendChild(likeIcon);

        itemLikes.appendChild(spanrate);
        itemGallery.appendChild(item);
        itemGallery.appendChild(itemLikes);
        //gallery a pour enfant item entier
        section.appendChild(itemGallery);
    });

    //on initialise le total des likes actuel
    initializeTotalLikes(photographer, medias);
    displayLightbox({ medias });
}

// Fonction pour initialiser le content de la div des likes
function initializeTotalLikes(photographer, medias) {
    let sumLikes = getTotalLikes(medias);
    const rating = document.querySelector('.photographer-rating');

    const totalLikes = document.createElement('div');
    totalLikes.classList.add('rating');
    const ratingLikes = document.createElement("p");
    ratingLikes.id = "total-likes";
    console.log(sumLikes);
    ratingLikes.textContent = sumLikes;

    const likeIcon = document.createElement('img');
    likeIcon.classList.add('heart-icon');
    likeIcon.src = 'assets/icons/heart-total.svg';
    likeIcon.alt = 'Likes';

    const price = document.createElement('p');
    price.textContent = `${photographer.price} € / jour`;

    totalLikes.appendChild(ratingLikes);
    totalLikes.appendChild(likeIcon);

    rating.innerHTML = ''; // Réinitialiser le contenu
    rating.appendChild(totalLikes);
    rating.appendChild(price);
}

// Fonction pour mettre à jour uniquement le total des likes
function updateTotalLikes(medias) {
    let sumLikes = getTotalLikes(medias);
    const ratingLikes = document.getElementById('total-likes');
    console.log(sumLikes);
    ratingLikes.textContent = sumLikes;
}


//cibler le select
const sortSelect = document.getElementById("sortSelect");

//écouteur d'event pour le changement de sélection
sortSelect.addEventListener("change", (event) => handleSortChange(event, currentPhotographer, currentMedias, displayPhotographerMedia));


