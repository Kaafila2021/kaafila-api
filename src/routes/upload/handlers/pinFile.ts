require('dotenv').config();
import handleError from "../../../helpers/handle-error";
import _fileHash from "../../../helpers/sha256";
import pinataSDK from '@pinata/sdk';

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

const pinFile = (req, res) => {
    const hash = req.body.hash;
    pinata.pinByHash(hash).then((status) => {
        //handle results here
        console.log('Pin status => ', status);
        res
            .status(200)
            .contentType("text/json")
            .json({ status });
    }).catch((err) => {
        //handle error here
        console.log(err);
        handleError(err, res);
    });
}

export default pinFile;