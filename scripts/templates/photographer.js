export function photographerTemplate(data) {
    //destructuring : ajout des autres infos necessaires pour la carte photographe
    //ajout de l'id pour le véhiculer au clik sur une card
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;
    //texte qui sera display dans l'attribut alt de la balise a
    const ariaLink = `link to ${name} photographer profile`;
    //lien qui nous emmène vers le profile du photographe où on véhicule l'id
    const link = `photographer.html?id=${id}`;

    // Total des likes initialisé à zéro
    let totalLikes = 0;


    function getUserCardDOM() {
        const article = document.createElement('article');

        //ajout de l'élément clickable vers le profile du photographe
        const profileLink = document.createElement('a');
        //définition du texte alternatif pour le lien
        profileLink.setAttribute("aria-label", ariaLink);
        //lien vide pour le moment
        profileLink.setAttribute("href", link);
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `${name} picture`);
        const h2 = document.createElement('h2');
        h2.textContent = name;

        //enfants de la balise a
        profileLink.appendChild(img);
        profileLink.appendChild(h2);

        //ville, tagline, price
        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement('p');
        p.textContent = tagline;
        const span = document.createElement('span');
        span.textContent = `${price}€/jour`;

        // Affichage du total des likes
        const totalLikesDisplay = document.createElement('span');
        totalLikesDisplay.textContent = totalLikes; // Initialisation à zéro
        totalLikesDisplay.classList.add('total-likes'); // Ajout de classe pour le cibler

        //enfants de article a (img et h2) + h3, p, span
        article.appendChild(profileLink);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);

        return (article);
    }


    return { name, picture, getUserCardDOM }
}

// Fonction pour calculer le nombre total de likes
export function getTotalLikes(medias) {
    let totalLikes = 0;
    medias.forEach(media => {
        totalLikes += media.likes;
    });
    return totalLikes;
}