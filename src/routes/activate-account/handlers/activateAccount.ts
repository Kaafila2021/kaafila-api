import handleError from "../../../helpers/handle-error";
import User from '../../../schemas/User.schema';
import Token from "../../../schemas/Token.schema";
import Referer from "../../../schemas/Referer.schema";
const ObjectId = require('mongoose').Types.ObjectId;

const activateAccount = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId) as any;
        if (!user) return handleError("invalid link or expired", res);

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return handleError("invalid link or expired", res);

        user.isVerified = true;
        await user.save();

        const referer = await Referer.findOne({
            referer: new ObjectId(req.params.userId)
        }) as any;
        referer.user_refered_activated = true;
        referer.save();

        res
            .status(200)
            .contentType("text/json")
            .json({
                error: null,
                data: null,
                ok: true,
                message: 'Activated account succesfully.'
            });

    } catch (err) {
        handleError(err, res)
    }
}

export default activateAccount;