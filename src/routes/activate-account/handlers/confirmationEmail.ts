import handleError from "../../../helpers/handle-error";
import sendEmail from "../../../helpers/send-email";
import User from '../../../schemas/User.schema';
import Token from "../../../schemas/Token.schema";
const crypto = require("crypto");

const confirmationEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }) as any;
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id }) as any;
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(16).toString("hex"),
            }).save();
        }

        const text = 'Hello ' + user.name + ',\n\n' + 'Please verify your account by clicking the link: ' + process.env.BASE_URL + '\/#/\confirmation\/' + user._id + '\/' + token.token + '\n\nThank You!\n';
        await sendEmail(user.email, "Kaafila account verification link", text);

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

export default confirmationEmail;