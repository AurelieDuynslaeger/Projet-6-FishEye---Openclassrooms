function photographerTemplate(data) {
    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;
    const link = `link to ${name} photographer profile`

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        //ajout de l'élément clickable vers le profile du photographe
        const profileLink = document.createElement('a');
        //définition du texte alternatif pour le lien
        profileLink.setAttribute("alt", link);
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        profileLink.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        return (profileLink);
    }
    return { name, picture, getUserCardDOM }
}