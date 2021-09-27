import Transaction from "./Transaction";
import * as crypto from "crypto";
import * as eccrypto from 'eccrypto'


export default class Block {
    transactions: Transaction[]
    prevHash: Buffer
    nonce: number

    constructor(transactions?: Transaction[]) {
        this.transactions = []
        this.prevHash = Buffer.from("")
        this.nonce = 0

        if (transactions != null) {
            for (let transaction of transactions) {
                this.addTx(transaction)
            }
        }
    }

    addTx(transaction: Transaction): Boolean {
        this.transactions.push(transaction)
        return true
    }

    setPrevHash(prevHash: Buffer) {
        this.prevHash = prevHash;
    }
    
    getHash(): Buffer {
        let txsHashes = [];
        for (let tx of this.transactions) {
            txsHashes.push(tx.getHash());
        }
        const str = [...txsHashes, this.prevHash, this.nonce].toString()
        const hash = crypto.createHash('sha256').update(str).digest()
        return hash;
    }

    mine(difficulty: number): number {
        const targetSubstring = '0'.repeat(difficulty);
        
        const start: number = Date.now()

        const wrongHashes: Buffer[] = [] 
        while (this.getHash().toString().slice(0, difficulty) != targetSubstring) {
            this.nonce += 1;
            wrongHashes.push(this.getHash()) 
        }
        const end: number = Date.now()
        const duration: number = end - start

        return duration / 1000;
    }

    // TODO
    validateTransactions() {

    }
}
