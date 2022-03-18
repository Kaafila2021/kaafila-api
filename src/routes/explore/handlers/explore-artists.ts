import handleError from "../../../helpers/handle-error";
import FileUpload from "../../upload/handlers/schemas/fileUpload.schema";

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const exploreArtists = async (req, res) => {
    try {
        const filesToSearch = await FileUpload.find().limit(20).select('user').populate('user') as any;
        const users = new Set<string>();
        filesToSearch.forEach(({ user }) => users.add(JSON.stringify(user)));

        const artists = [];
        users.forEach(artist => {
            artists.push({ name: JSON.parse(artist).name, profile_image: JSON.parse(artist).profile_image })
        })

        res
            .status(200)
            .json({ artists: shuffle(artists).slice(0, 5) });

    } catch (err) {
        handleError(err, res)
    }

}

export default exploreArtists;