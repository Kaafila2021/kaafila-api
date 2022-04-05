import handleError from "../../../helpers/handle-error";
import User from "../../../schemas/User.schema";
const bcrypt = require('bcrypt');

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
        });
        const savedUser = await user.save();
        res
            .status(200)
            .contentType("text/json")
            .json({
                error: null,
                data: savedUser
            });

    } catch (err) {
        handleError(err, res)
    }
}

export default register;