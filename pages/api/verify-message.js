import { PublicKey } from '@solana/web3.js';
import { message } from './get-message';
import nacl from "tweetnacl"

function verifyMessage(req, res) {
    const { address, signature } = req.body;
    let processedSignature = new Uint8Array(signature.data);
    let pubkey = new PublicKey(address);
    let encoder = new TextEncoder("utf-8");
    let bytes = encoder.encode(message)

    const verified = nacl.sign.detached.verify(bytes, processedSignature, pubkey.toBytes());
    const secretURL = "https://www.youtube.com/watch?v=sO8OG2OZx20";

    if (verified) {
        res.status(200).json({ verified, secretURL });
    } else {
        res.status(400).json({ verified });
    }
}

export default verifyMessage;