import * as crypto from 'crypto'
import * as eccrypto from 'eccrypto'

import { Signature, Address } from './types'

export default class Transaction {
    from: Address;
    to: Address;
    amount: number;
    signature?: Signature;

    constructor(from: Address, to: Address, amount: number) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

    getHash(): Buffer {
        const data = this.from.toString() + this.to.toString() + this.amount.toString();
        const hash = crypto.createHash('sha256').update(data).digest();
        return hash;
    }

    sign(signature: Signature) {
        // validate
        // if (signature checks out)
        this.signature = signature
    }
}