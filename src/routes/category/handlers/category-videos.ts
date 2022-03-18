import handleError from "../../../helpers/handle-error";
import FileUpload from '../../upload/handlers/schemas/fileUpload.schema';

const categoryVideos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const page_size = 20;
        const skip = (page - 1) * page_size;
        const { categoryId } = req.params;
        const query = { "form_data.category_id": categoryId, 'isDisabled': false };


        const videos = await FileUpload.find(query, null, { sort: { upload_date: -1 } })
            .skip(skip)
            .limit(page_size)
            .populate('user');

        const total_items = await FileUpload.countDocuments(query);

        res
            .status(200)
            .contentType("text/json")
            .json({
                error: null,
                data: videos,
                metadata: { page, total_items, page_size }
            });

    } catch (err) {
        handleError(err, res)
    }

}

export default categoryVideos;