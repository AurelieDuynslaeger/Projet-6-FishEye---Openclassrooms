//Mettre le code JavaScript lié à la page photographer.html

//récuperer l'id véhiculé dans l'url

document.addEventListener("DOMContentLoaded", async () => {
    //on vient regarder dans l'url le param id
    const paramUrl = new URLSearchParams(window.location.search);
    console.log(paramUrl);
    const idPhotograh = paramUrl.get('id');
    console.log(idPhotograh);

    //si unid est trouvé
    if (idPhotograh) {
        //on lance le fetch photographers
        const photographers = await getPhotographers();
        //on vient trouver dans photographers, l'id qui correspond à l'id de l'url
        const photographer = photographers.photographers.find(photograph => photograph.id == idPhotograh);

        //si le photographe est trouvé
        if (photographer) {
            //on display ses infos comme avec displayData
            displayPhotographerData(photographer)
        } else {
            console.error("Photographe inconnu")
        }
    }
});

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

function displayPhotographerData(photographer) {
    //on cible les sections de photographer.html
    const header = document.querySelector('.photograph-header');

    //h1 qui display le nom
    const h1 = document.createElement('h1');
    h1.textContent = photographer.name;

    //h3 qui display la ville
    const location = document.createElement('h3');
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
        return
        //on aon retourne uniquement medias
        { medias };

    } catch (error) {
        console.error("Erreur: ".error);
        return {
            medias: []
        };
    }
}

function displayPhotographerMedia(photographer) {
    //on cible la section de photographer.html
    const section = document.querySelector('.photograph-gallery');


    //on insère cette div dans le header avant le boutton de contact
    header.insertBefore(identityInfo, header.querySelector('.contact_button'));


    //on display la photo de profile avec la src et le alt text pour le nom du photograph
    const picture = document.createElement('img');
    picture.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    picture.setAttribute('alt', photographer.name);

    // header.appendChild(identityInfo);
    header.appendChild(picture);
}


