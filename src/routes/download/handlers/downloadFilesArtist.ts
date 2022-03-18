import handleError from "../../../helpers/handle-error";
import FileUpload from "../../upload/handlers/schemas/fileUpload.schema";

const downloadFilesArtist = async (req, res) => {
    console.log('Downloading...');
    try {
        const { id } = req.params;

        const filesToSearch = await FileUpload.find({ user: id }).populate('user');

        res
            .status(200)
            .json({ files: filesToSearch });

    } catch (err) {
        handleError(err, res)
    }

}

export default downloadFilesArtist;