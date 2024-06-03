//fonctions de tri des médias (popularité, et titre)
export function sortByPopularity(medias) {
    return medias.sort((a, b) => b.likes - a.likes);
}

export function sortByTitle(medias) {
    return medias.sort((a, b) => a.title.localeCompare(b.title));
}

export function handleSortChange(event, currentPhotographer, currentMedias, displayPhotographerMedia) {
    // on stocke la valeur sélectionnée
    const selectedOption = event.target.value;

    // vérif quelle option est choisie et effectuer le tri
    if (selectedOption === "popularity") {
        const sortedMedias = sortByPopularity(currentMedias);
        displayPhotographerMedia(currentPhotographer, sortedMedias);
    } else if (selectedOption === "title") {
        const sortedMedias = sortByTitle(currentMedias);
        displayPhotographerMedia(currentPhotographer, sortedMedias);
    }
}
