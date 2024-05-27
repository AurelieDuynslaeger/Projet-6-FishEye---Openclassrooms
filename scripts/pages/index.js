async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
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

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

