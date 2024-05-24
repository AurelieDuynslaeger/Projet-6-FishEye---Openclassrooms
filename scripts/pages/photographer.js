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
        const photographers = await getPhotographers();
        console.log(photographers); //ok
        //on vient trouver dans photographers, l'id qui correspond à l'id de l'url
        const photographer = photographers.photographers.find(photograph => photograph.id == idPhotograh);
        //si le photographe est trouvé
        if (photographer) {
            console.log(photographer);
            displayPhotographerData(photographer);
            const medias = await getMedias();
            const photographerMedias = medias.medias.filter(media => media.photographerId == idPhotograh);
            console.log(photographerMedias);
            //on display ses infos comme avec displayData
            displayPhotographerMedia(photographerMedias);
        } else {
            console.error("Photographe inconnu")
        }
    }
});

//récupération de tous les photographes
async function getPhotographers() {
    try {
        // fetch vers le fichier json
        const fetchPhotographers = await fetch("data/photographers.json");
        //si autre réponse que 200 alors afficher l'erreur
        if (!fetchPhotographers.ok) {
            throw new Error('Erreur récup data')
        }
        //sinon on stocke le fetch dans data et objet js
        const data = await fetchPhotographers.json();
        return {
            //on attribue à photographers, ce que l'on récupère dans data
            photographers: data.photographers
        };
    } catch (error) {
        console.error("Erreur: ".error);
        return {
            photographers: []
        };
    }
}

//affichage des données des photographe home page
function displayPhotographerData(photographer) {
    //on cible les sections de photographer.html
    const header = document.querySelector('.photograph-header');

    //h1 qui display le nom
    const h1 = document.createElement('h1');
    h1.textContent = photographer.name;

    //h3 qui display la ville
    const location = document.createElement('h2');
    location.textContent = `${photographer.city}, ${photographer.country}`;

    //p qui display la tagline
    const tagline = document.createElement('p');
    tagline.textContent = photographer.tagline;

    //div .photographer-info qui regroupe nom, ville, tagline
    const identityInfo = document.createElement('div');
    identityInfo.classList.add("photographer-info");
    identityInfo.appendChild(h1);
    identityInfo.appendChild(location);
    identityInfo.appendChild(tagline);



    //on insère cette div dans le header avant le boutton de contact
    header.insertBefore(identityInfo, header.querySelector('.contact_button'));


    //on display la photo de profile avec la src et le alt text pour le nom du photograph
    const picture = document.createElement('img');
    picture.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    picture.setAttribute('alt', photographer.name);

    // header.appendChild(identityInfo);
    header.appendChild(picture);
}

//récupération de tous les médias
async function getMedias() {
    try {
        // fetch vers le fichier json
        const fetchMedias = await fetch("data/photographers.json");
        //si autre réponse que 200 alors afficher l'erreur
        if (!fetchMedias.ok) {
            throw new Error('Erreur récup data')
        }
        //sinon on stocke le fetch dans data et objet js
        const dataMedias = await fetchMedias.json();
        const medias = dataMedias.media;
        console.log(medias);
        return { medias };
        // retourne uniquement medias
    } catch (error) {
        console.error("Erreur: ".error);
        return {
            medias: []
        };
    }
}



//contenu affiché selon le tri ou non
let currentMedias = [];

//affichage des média d'un photographe par l'id
function displayPhotographerMedia(medias) {
    //on stocke par défaut les médias récup dans le fetch,
    //l'affichage changera selon le tri ensuite
    currentMedias = medias;
    //on cible la section de photographer.html
    const section = document.querySelector('.photograph-gallery');

    //on efface le contenu actuel (tris)
    section.innerHTML = '';

    //pour chaque média du photographe, on crée une div avec la class "gallery-item";
    medias.forEach(media => {
        const itemGallery = document.createElement('div');
        itemGallery.classList.add('gallery-item');

        if (media.image) {
            //si le média est une photo
            const img = document.createElement('img');
            img.src = `assets/media/${media.image}`;
            img.alt = media.title;
            itemGallery.appendChild(img);
        } else if (media.video) {
            //si le média est une photo
            const video = document.createElement('video');
            video.src = `assets/media/${media.video}`;
            video.controls = true;
            itemGallery.appendChild(video);
        }

        //titre de l'item
        const itemTitle = document.createElement('h4');
        itemTitle.textContent = media.title;

        const itemLikes = document.createElement('div');
        itemLikes.classList.add('likes');
        const spanrate = document.createElement('div');
        spanrate.classList.add('item-rating');

        const likeIcon = document.createElement('img');
        //icon Coeur pour les likes
        likeIcon.src = 'assets/icons/heart.svg';
        likeIcon.alt = 'Likes';
        //compte des likes
        const likesCount = document.createElement('span');
        likesCount.textContent = media.likes;
        likesCount.classList.add('likes-count');
        itemLikes.appendChild(itemTitle);

        //écouteur d'évenement sur l'icone pr le compteur de likes qui s'incrémente : 
        likeIcon.addEventListener('click', () => {
            //on récup d'abord le nombre de likes actuel
            const likesCount = itemGallery.querySelector(".likes-count");
            let actualLikes = parseInt(likesCount.textContent);//valeur de likesCount
            actualLikes++; //mise à jour au clik du compteur

            likesCount.textContent = actualLikes; //affichage mis à jour
        })

        //gallery item a pour enfant titre et likes
        spanrate.appendChild(likesCount);
        spanrate.appendChild(likeIcon);

        itemLikes.appendChild(spanrate);
        itemGallery.appendChild(itemLikes);
        //gallery a pour enfant item entier
        section.appendChild(itemGallery);

    });

    //div fixée pour afficher le nb total de likes et prix du photographe
    const rating = document.querySelector('.photographer-rating');

    const totalLikes = document.createElement('div');
    totalLikes.classList.add('rating');

    const ratingLikes = document.createElement("p");
    ratingLikes.textContent = 297081; //ici il y aurait le véritable nb de likes (logique à implémenter)

    const likeIcon = document.createElement('img');
    //icon Coeur pour les likes totaux
    likeIcon.src = 'assets/icons/heart.svg';
    likeIcon.alt = 'Likes';

    const price = document.createElement('p');
    price.textContent = `€/jour`;


    totalLikes.appendChild(ratingLikes);
    totalLikes.appendChild(likeIcon);

    rating.appendChild(totalLikes);
    rating.appendChild(price);

}

//cibler le select
const btn_select = document.getElementById("sortSelect");

//écouteur d'event pour le changement de sélection
sortSelect.addEventListener("change", handleSortChange);



// gestion du changement de sélection
function handleSortChange(event) {
    //on stock la valeur selectionnée
    const selectedOption = event.target.value;

    //vérif quelle option est choisie et effectuer le tri
    if (selectedOption === "popularity") {
        sortByPopularity();
    } else if (selectedOption === "title") {
        sortByTitle();
    }
}

//tri popularité
function sortByPopularity() {
    currentMedias.sort((a, b) => b.likes - a.likes);
    displayPhotographerMedia(currentMedias);
}

//tri titre
function sortByTitle() {
    currentMedias.sort((a, b) => a.title.localeCompare(b.title));
    displayPhotographerMedia(currentMedias);
}