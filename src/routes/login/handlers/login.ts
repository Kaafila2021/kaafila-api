import handleError from "../../../helpers/handle-error";
import User from "../../register/schemas/User.schema";
import jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }) as any;
        const validPassword = await bcrypt.compare(req.body.password, user?.password);
        if (!user || !validPassword) return res.status(404).json({ error: 'Wrong email or password' });

        // create token
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.TOKEN_SECRET)

        res
            .status(200)
            .header('auth-token', token)
            .contentType("text/json")
            .json({
                error: null,
                data: { token }
            });

    } catch (err) {
        handleError(err, res)
    }
}

export default login;