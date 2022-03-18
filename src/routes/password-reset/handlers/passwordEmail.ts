import handleError from "../../../helpers/handle-error";
import sendEmail from "../../../helpers/send-email";
import User from '../../register/schemas/User.schema';
import Token from "../schemas/Token.schema";
const crypto = require("crypto");

const passwordEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }) as any;
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id }) as any;
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/#/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res
            .status(200)
            .contentType("text/json")
            .json({
                error: null,
                data: null,
                ok: true,
                message: 'Password reset link sent to your email account'
            });

    } catch (err) {
        handleError(err, res)
    }
}

export default passwordEmail;