import handleError from "../../../helpers/handle-error";
import User from '../../register/schemas/User.schema';
import axios from 'axios';
require('dotenv').config();

const myself = async (req, res) => {


    (async () => {

        try {

            const user = await User.findById(req.user.id).select('-password')
            const body = {
                "expiresIn": 3600000,
                "permissions": [
                    "ipfs.add",
                    {
                        "assets.write": "*"
                    }
                ],
                "uid": user._id
            }
            const { data } = await axios.post('https://wjcpttgp59.execute-api.us-west-2.amazonaws.com/prd/grant', body, { headers: { 'Authorization': process.env.IPFS_NODE_KEY } });

            res
                .status(200)
                .contentType("text/json")
                .json({
                    error: null,
                    data: { user, ipfsToken: data.token }
                });

        } catch (err) {
            handleError(err, res)
        }

    })();
}

export default myself;