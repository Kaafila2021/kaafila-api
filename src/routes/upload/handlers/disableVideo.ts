import handleError from "../../../helpers/handle-error";
import _fileHash from "../../../helpers/sha256";
import FileUpload from "../../../schemas/fileUpload.schema";

const disableVideo = async (req, res) => {
    try {

        const { videoId, deactivate } = req.body;

        const video = await FileUpload.findByIdAndUpdate(videoId, {
            $set: { 'isDisabled': deactivate }
        })

        res
            .status(201)
            .contentType("text/json")
            .json({ status: 'OK' });

    } catch (err) {
        handleError(err, res);
    }
}

export default disableVideo;