import handleError from "../../../helpers/handle-error";
import FileUpload from "../../../schemas/fileUpload.schema";

const explore = async (req, res) => {
    try {
        const filesToSearch = await FileUpload.find({ 'isDisabled': false }) as any;

        res
            .status(200)
            .json({ files: filesToSearch });

    } catch (err) {
        handleError(err, res)
    }

}

export default explore;