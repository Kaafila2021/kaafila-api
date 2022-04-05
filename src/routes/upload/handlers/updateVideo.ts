import handleError from "../../../helpers/handle-error";
import _fileHash from "../../../helpers/sha256";
import FileUpload from "../../../schemas/fileUpload.schema";

const updateVideo = async (req, res) => {
    try {

        const { video } = req.body;

        const updatedVideo = await FileUpload.findByIdAndUpdate(video._id,
            { $set: { 'form_data.title': video.form_data.title } })

        res
            .status(201)
            .contentType("text/json")
            .json({ status: 'OK' });

    } catch (err) {
        handleError(err, res);
    }
}

export default updateVideo;