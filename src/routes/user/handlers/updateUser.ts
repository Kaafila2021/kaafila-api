import handleError from "../../../helpers/handle-error";
import User from '../../register/schemas/User.schema';

const updateUser = async (req, res) => {

    try {

        const newUser = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, newUser).select('-password');

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

export default updateUser;