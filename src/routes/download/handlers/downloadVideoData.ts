import handleError from "../../../helpers/handle-error";
import FileUpload from "../../../schemas/fileUpload.schema";

const downloadVideoData = async (req, res) => {
    console.log('Downloading...');
    try {
        const { fileHash } = req.params;

        const file = await FileUpload.findOne({ "confirmed_txn_note.hash": fileHash }).populate('user');

        res
            .status(200)
            .json(file);

    } catch (err) {
        handleError(err, res)
    }

}

export default downloadVideoData;