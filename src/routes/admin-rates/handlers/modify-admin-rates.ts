import handleError from "../../../helpers/handle-error";
import AdminRates from "../schemas/AdminRates.schema";

const modifyAdminRates = async (req, res) => {
    try {
        const { name, rate } = req.body;

        const savedRates = await AdminRates.findOneAndUpdate({ name }, { rate })

        res
            .status(200)
            .contentType("text/json").json({
                error: null,
                data: savedRates
            });

    } catch (err) {
        handleError(err, res)
    }

}

export default modifyAdminRates;