//récup de tous les photographes
export async function getPhotographers() {
    try {
        const fetchPhotographers = await fetch("data/photographers.json");
        if (!fetchPhotographers.ok) {
            throw new Error('Erreur récup data');
        }
        const data = await fetchPhotographers.json();
        return {
            photographers: data.photographers
        };
    } catch (error) {
        console.error("Erreur: ", error);
        return {
            photographers: []
        };
    }
}

//récup des tous les médias
export async function getMedias() {
    try {
        const fetchMedias = await fetch("data/photographers.json");
        if (!fetchMedias.ok) {
            throw new Error('Erreur récup data');
        }
        const dataMedias = await fetchMedias.json();
        const medias = dataMedias.media;
        return { medias };
    } catch (error) {
        console.error("Erreur: ", error);
        return {
            medias: []
        };
    }
}
