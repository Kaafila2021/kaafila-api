import handleError from "../../../helpers/handle-error";
import _fileHash from "../../../helpers/sha256";
import fs from 'fs';
import FileUpload from "../../../schemas/fileUpload.schema";

const uploadCover = async (req, res) => {
    try {

        const fileUpload = await FileUpload.findByIdAndUpdate(req.body.ref,
            {
                cover: {
                    data: fs.readFileSync(req.file.path),
                    contentType: req.file.mimetype
                }
            });

        res
            .status(200)
            .contentType("text/json")
            .json({ response: fileUpload });

    } catch (err) {
        console.log(err)
        handleError(err, res);
    }
}

export default uploadCover;