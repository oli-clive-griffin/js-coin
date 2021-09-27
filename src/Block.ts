import Transaction from "./Transaction";
import * as cj from "crypto-js";
import * as eccrypto from 'eccrypto'


export default class Block {
    transactions: Array<Transaction>
    prevHash: string
    nonce: number

    constructor(transactions?: Transaction[]) {
        this.transactions = []
        this.prevHash = ""
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

    setPrevHash(prevHash: string) {
        this.prevHash = prevHash;
    }
    
    getHash(): string {
        let txsHashes = [];
        for (let tx of this.transactions) {
            txsHashes.push(tx.getHash());
        }
        const hash = cj.SHA256(txsHashes.join("") + this.prevHash + this.nonce.toString()).toString()
        return hash;
    }

    mine(difficulty: number) {
        const targetSubstring = '0'.repeat(difficulty);
        
        const start: number = Date.now()

        const wrongHashes: string[] = [] 
        while (this.getHash().slice(0, difficulty) != targetSubstring) {
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
