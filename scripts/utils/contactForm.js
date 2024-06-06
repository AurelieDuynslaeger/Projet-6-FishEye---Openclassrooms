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

        const header = document.querySelector('.modal_header');
        const h2 = document.createElement('h2');
        h2.classList.add("header_title");
        h2.innerHTML = `Contactez-Moi <br> ${photographer.name}`;
        header.insertBefore(h2, header.querySelector('.cross'));
    }

    //écouteur d'event sur le formulaire
    const form = document.querySelector("#contact_modal form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        //récup des données saisies sur le formulaire
        const prenom = document.getElementById('prenom').value;
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        //Affichage des valeurs dans la console
        console.log(`Prénom: ${prenom}`);
        console.log(`Nom: ${nom}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);

    })
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
        console.error("Erreur: ", error);
        return {
            photographers: []
        };
    }
}


function displayModal() {
    const main = document.getElementById('main');
    main.setAttribute('aria-hidden', 'true');
    const modal = document.getElementById("contact_modal");
    modal.setAttribute('aria-hidden', 'false');
    const body = document.body;
    body.classList.add('no-scroll');
    modal.style.display = "block";
    const firstInput = modal.querySelector('input');
    //on met le focus sur le premier input
    firstInput.focus();
}

function closeModal() {
    const main = document.getElementById('main');
    main.setAttribute('aria-hidden', 'false');
    const modal = document.getElementById("contact_modal");
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = "none";
    const body = document.body;
    body.classList.remove('no-scroll');
}
