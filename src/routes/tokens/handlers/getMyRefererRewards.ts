import handleError from "../../../helpers/handle-error";
import { algow } from '../../../AlgoIPFS';
import algosdk, { Algodv2 } from 'algosdk';
import Referer from '../../../schemas/Referer.schema';
require('dotenv').config();
const ObjectId = require('mongoose').Types.ObjectId;

const kaafilaTokenId = +process.env.KFL_TOKEN_ID;


const getMyTokens = async (req, res) => {
    try {
        // Construct the transaction
        let params = await algow.algodClient.getTransactionParams().do();
        const currentWallet = req.body.wallet;

        const referer = await Referer.find({
            $and: [
                {
                    $or: [
                        { $and: [{ referedBy: new ObjectId(req.user.id) }, { referedByRewardsClaimed: false }] },
                        { $and: [{ referer: new ObjectId(req.user.id) }, { refererRewardsClaimed: false }] },
                    ]
                },
                { user_refered_activated: true }
            ]
        });

        if (!referer || referer.length === 0) {
            return res.status(404).json({ error: 'No rewards' });
        }

        const qtyToWithdraw = referer.length * 2500;

        const account = algosdk.mnemonicToSecretKey(process.env.WALLET_PASSPHRASE_ESCROW_REFERER);
        const assetEscrow = account.addr;

        const note = new Uint8Array([]);

        const txn = algosdk.makePaymentTxn(currentWallet, assetEscrow, 2000, 0, undefined, params.firstRound, params.lastRound, new Uint8Array([]), params.genesisHash, params.genesisID);

        const txn1 = algosdk.makeAssetTransferTxn(assetEscrow, currentWallet, undefined, undefined, params.fee, qtyToWithdraw, params.firstRound, params.lastRound, note, params.genesisHash, params.genesisID, kaafilaTokenId);

        const txns = [txn, txn1];
        // Group both transactions
        algosdk.assignGroupID(txns);

        // Sign each transaction in the group 
        const signedTx = txn1.signTxn(account.sk)
        console.log("Signed transaction with txID: %s", txn.txID().toString());

        // Assemble txn
        let signedTxns = [];
        signedTxns.push(signedTx);

        res
            .status(200)
            .contentType("text/json")
            .json({
                result: 'OK',
                signedTxns,
                txnBytes: [txn.toByte(), txn1.toByte()]
            })
    } catch (err) {
        handleError(err, res)
    }

}

export async function compileSignature(client: Algodv2, signatureSource) {
    let compileResponse = await client.compile(signatureSource).do();
    return compileResponse;

}

export default getMyTokens;