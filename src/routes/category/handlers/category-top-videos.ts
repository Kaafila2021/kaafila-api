import handleError from "../../../helpers/handle-error";
import FileUpload from '../../upload/handlers/schemas/fileUpload.schema';

const categoryTopVideos = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const PAGE_SIZE = 20;
        const skip = (page - 1) * PAGE_SIZE;

        const { categoryId } = req.params;
        const topVideos = await FileUpload.find({
            "form_data.category_id": categoryId, 'isDisabled': false
        }, null, { sort: { upload_date: -1 } })
            .skip(skip)
            .limit(PAGE_SIZE)
            .populate('user');

        res
            .status(200)
            .contentType("text/json")
            .json({
                error: null,
                data: topVideos
            });

    } catch (err) {
        handleError(err, res)
    }

}

export default categoryTopVideos;