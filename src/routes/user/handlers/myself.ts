import handleError from "../../../helpers/handle-error";
import User from '../../register/schemas/User.schema';

const myself = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select('-password')

        res
            .status(200)
            .contentType("text/json")
            .json({
                error: null,
                data: { user }
            });

    } catch (err) {
        handleError(err, res)
    }
}

export default myself;