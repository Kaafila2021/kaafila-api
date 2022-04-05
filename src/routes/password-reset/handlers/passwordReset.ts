import handleError from "../../../helpers/handle-error";
import User from '../../../schemas/User.schema';
import Token from "../../../schemas/Token.schema";
const bcrypt = require('bcrypt');

const passwordReset = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId) as any;
        if (!user) return handleError("invalid link or expired", res);

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return handleError("invalid link or expired", res);


        // hash password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        user.password = password;
        await user.save();
        await token.delete();

        res
            .status(200)
            .contentType("text/json")
            .json({
                error: null,
                data: null,
                ok: true,
                message: 'Password reset sucessfully.'
            });

    } catch (err) {
        handleError(err, res)
    }
}

export default passwordReset;