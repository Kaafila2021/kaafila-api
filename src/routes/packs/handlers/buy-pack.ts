import handleError from "../../../helpers/handle-error";
import Pack from "../schemas/pack.schema";

const buyPack = async (req, res) => {
    try {
        const fileUpload = new Pack(req.body);
        await fileUpload.save();

        res
            .status(201)
            .contentType("text/json")
            .json({ response: 'pack added' });

    } catch (err) {
        handleError(err, res)
    }

}

export default buyPack;