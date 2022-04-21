import handleError from "../../../helpers/handle-error";
import sendEmail from "../../../helpers/send-email";
import Referer from "../../../schemas/Referer.schema";
import Token from "../../../schemas/Token.schema";
import User from "../../../schemas/User.schema";
require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require("crypto");

const register = async (req, res) => {

    try {
        const isEmailExist = await User.findOne({ email: req.body.email });
        if (isEmailExist) {
            return res.status(400).json(
                { error: 'Email registered' }
            )
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            last_name: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password
        }) as any;

        if (req.query.hasOwnProperty('referer')) {
            const referer = new Referer({
                referer: user._id,
                referedBy: req.query.referer
            });
            await referer.save();
        }

        const savedUser = await user.save(function (err) {

            // generate token and save
            const token = new Token({ userId: user._id, token: crypto.randomBytes(16).toString('hex') }) as any;
            token.save(async function (err) {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }

                const text = 'Hello ' + req.body.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + process.env.BASE_URL + '\/#/\confirmation\/' + user._id + '\/' + token.token + '\n\nThank You!\n';
                await sendEmail(user.email, "Kaafila account verification link", text);

                res
                    .status(200)
                    .contentType("text/json")
                    .json({
                        error: null,
                        data: savedUser
                    });
            });

        });


    } catch (err) {
        handleError(err, res)
    }
}

export default register;