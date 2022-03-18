import handleError from "../../../helpers/handle-error";
import FileUpload from "../../upload/handlers/schemas/fileUpload.schema";

const downloadVideoData = async (req, res) => {
    console.log('Downloading...');
    try {
        const { fileId } = req.params;

        const file = await FileUpload.findOne({ file_id: fileId }).populate('user');

        res
            .status(200)
            .json(file);

    } catch (err) {
        handleError(err, res)
    }

}

export default downloadVideoData;