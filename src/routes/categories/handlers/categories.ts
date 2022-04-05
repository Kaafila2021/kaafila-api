import handleError from "../../../helpers/handle-error";
import Categories from "../../../schemas/Categories.schema";

const categories = async (req, res) => {
    try {

        const categories = await Categories.find();

        res
            .status(200)
            .contentType("text/json").json({
                error: null,
                data: categories
            });

    } catch (err) {
        handleError(err, res)
    }

}

export default categories;