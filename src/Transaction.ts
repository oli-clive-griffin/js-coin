import * as cj from 'crypto-js'
import * as eccrypto from 'eccrypto'

export default class Transaction {
    from: number;
    to: number;
    amount: number;

    constructor(from: number, to: number, amount: number) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

    getHash(): string {
        const data = this.from.toString() + this.to.toString() + this.amount.toString();
        const preHash = cj.SHA256(data);
        const hash = preHash.toString();
        return hash;
    }
}