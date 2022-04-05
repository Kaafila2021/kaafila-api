import handleError from "../../../helpers/handle-error";
import { algow } from '../../../AlgoIPFS';
import algosdk, { Algodv2 } from 'algosdk';
import WalletVideoWatch from "../../../schemas/wallet-video-watch.schema";
import AdminRates from "../../../schemas/AdminRates.schema";
require('dotenv').config();
const fs = require('fs');

const kaafilaTokenId = +process.env.KFL_TOKEN_ID;
const kaafilaUserWithrawalSC = +process.env.SMART_CONTRACT_USER_WITHRAWAL;
let currentRate: number;

try {
    (async () => {
        const adminRates = await AdminRates.findOne({ name: 'viewer_rate' }) as any;
        currentRate = +adminRates.rate;

        const currentRateId = adminRates._id;
        const currentRatesListener = AdminRates.watch();
        currentRatesListener.on('change', (change: any) => {
            if (change.documentKey._id.toString() === currentRateId.toString()) {
                currentRate = +change.updateDescription.updatedFields.rate
            }
        })
    })();
} catch (e) {
    console.log(e)
}

const getMyTokens = async (req, res) => {
    try {
        // Construct the transaction
        let params = await algow.algodClient.getTransactionParams().do();
        const currentWallet = req.body.wallet;

        const videoWatchDBObject = await WalletVideoWatch.find({ wallet: currentWallet, isRefunded: false }) as any;
        const totalTimeViewed = videoWatchDBObject?.reduce((acc, { timeViewed }) => acc + timeViewed, 0);

        const qtyToWithdraw = Math.floor(totalTimeViewed * currentRate);

        const assetEscrow = 'QKSMSMAF5J7EK2Q2AVX5GMKGH6ZT2UNCRKGKSCAVPMMCLHKNXF6BZIBXYE';

        const note = new Uint8Array([]);

        const txn = algosdk.makeAssetTransferTxn(algow.account.addr, assetEscrow, undefined, undefined, params.fee, qtyToWithdraw, params.firstRound, params.lastRound, note, params.genesisHash, params.genesisID, kaafilaTokenId);

        const txn1 = algosdk.makePaymentTxn(currentWallet, assetEscrow, params.fee, 3000, undefined, params.firstRound, params.lastRound, new Uint8Array([]), params.genesisHash, params.genesisID);

        const appArgs = [];
        appArgs.push(new Uint8Array(Buffer.from('Withdrawal')))
        const txn2 = algosdk.makeApplicationNoOpTxn(currentWallet, params, kaafilaUserWithrawalSC, appArgs);

        const txn3 = algosdk.makeAssetTransferTxn(assetEscrow, currentWallet, undefined, undefined, params.fee, qtyToWithdraw, params.firstRound, params.lastRound, note, params.genesisHash, params.genesisID, kaafilaTokenId);

        const txn4 = algosdk.makePaymentTxn(assetEscrow, algow.account.addr, params.fee, 1000, undefined, params.firstRound, params.lastRound, new Uint8Array([]), params.genesisHash, params.genesisID);

        const txns = [txn, txn1, txn2, txn3, txn4];
        // Group both transactions
        algosdk.assignGroupID(txns);

        // Sign each transaction in the group 
        const signedTx = txn.signTxn(algow.account.sk)
        console.log("Signed transaction with txID: %s", txn.txID().toString());
        const signatureProgramSource = fs.readFileSync('src/smart-contracts/kaafila_withdrawal_escrow.teal', { encoding: 'utf8', flag: 'r' });
        const signatureProgram = await compileSignature(algow.algodClient, signatureProgramSource);
        const program = new Uint8Array(Buffer.from(signatureProgram.result, "base64"));
        const lsig = new algosdk.LogicSigAccount(program);
        const signedTx3 = algosdk.signLogicSigTransaction(txn3, lsig);
        const signedTx4 = algosdk.signLogicSigTransaction(txn4, lsig);

        // const signedTx3 = txn3.signTxn(algow.account.sk)
        console.log("Signed transaction with txID: %s", txn3.txID().toString());
        console.log("Signed transaction with txID: %s", txn4.txID().toString());

        // Assemble txn
        let signedTxns = [];
        signedTxns.push(signedTx);
        signedTxns.push(signedTx3.blob);
        signedTxns.push(signedTx4.blob);

        res
            .status(200)
            .json({
                result: 'OK',
                signedTxns,
                txnBytes: [txn.toByte(), txn1.toByte(), txn2.toByte(), txn3.toByte()]
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