require('dotenv').config();
import AlgoWrapper from "./lib/AlgoWrapper";
// import IPFSWrapper from "./lib/IPFSWrapper";
import { IAlgoModel } from "./lib/models/IAlgoModel.model";


const algodConfigTEST: IAlgoModel = {
    'algodToken': {
        'X-API-Key': ''
    },
    'algodServer': 'https://node.testnet.algoexplorerapi.io/',
    'indexerServer': 'https://algoindexer.testnet.algoexplorerapi.io/v2',
    'algodPort': '',
    'passphrase': process.env.WALLET_PASSPHRASE,
    'encryptionPassword': 'ecryptedtst'
}

let algow: AlgoWrapper;
// let ipfsw: IPFSWrapper;
let init = false;

if (!init) {
    (async () => {
        try {
            algow = new AlgoWrapper(algodConfigTEST)
            // ipfsw = new IPFSWrapper(algodConfigTEST.encryptionPassword)
            // await ipfsw.init()
            init = true;
        } catch (error) {
            console.log(error)
        }
    })();
}

export {
    algow
};