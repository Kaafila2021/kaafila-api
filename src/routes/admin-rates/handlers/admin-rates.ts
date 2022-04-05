import handleError from "../../../helpers/handle-error";
import AdminRates from "../../../schemas/AdminRates.schema";

const adminRates = async (req, res) => {
    try {

        const rates = await AdminRates.find();

        res
            .status(200)
            .contentType("text/json").json({
                error: null,
                data: rates
            });

    } catch (err) {
        handleError(err, res)
    }

}

export default adminRates;