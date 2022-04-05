import handleError from "../../../helpers/handle-error";
import _fileHash from "../../../helpers/sha256";
import FileUpload from "../../../schemas/fileUpload.schema";

const uploadDBSync = async (req, res) => {
    try {

        const fileToUpload = {
            ...req.body,
            form_data: {
                ...req.body.form_data,
                category_id: req.body.form_data.category
            }
        };
        const fileUpload = new FileUpload(fileToUpload);
        const newFile = await fileUpload.save();
        res
            .status(203)
            .contentType("text/json")
            .json({ response: newFile });

    } catch (err) {
        handleError(err, res);
    }
}

export default uploadDBSync;