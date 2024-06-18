import { getTotalLikes } from "../templates/photographer.js";

// Fonction pour initialiser le content de la div des likes
export function initializeTotalLikes(photographer, medias) {
    //récup du total de likes des médias d'un photographer
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
    likeIcon.alt = 'icones pour les Likes';

    const price = document.createElement('p');
    price.textContent = `${photographer.price} € / jour`;

    totalLikes.appendChild(ratingLikes);
    totalLikes.appendChild(likeIcon);

    // Réinitialiser le contenu
    rating.innerHTML = '';
    rating.appendChild(totalLikes);
    rating.appendChild(price);
}

// Fonction pour mettre à jour uniquement le total des likes
export function updateTotalLikes(medias) {
    let sumLikes = getTotalLikes(medias);
    const ratingLikes = document.getElementById('total-likes');
    console.log(sumLikes);
    ratingLikes.textContent = sumLikes;
}