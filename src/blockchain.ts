import * as cj from "crypto-js";
import { runInThisContext } from "vm";
// import { sha256, sha224 } from "js-sha256";
// import { Hash } from "crypto";

class Transaction {
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
        const hash = preHash.toString()
        return hash
    }
}

class Block {
    transactions: Array<Transaction>
    prevHash: string
    nonce: number

    constructor() {
        this.transactions = []
        this.prevHash = ""
        this.nonce = 0
    }

    // setPrevHash(prevHash: string) {
    //     this.prevHash = prevHash
    // }

    addTx(tx: Transaction): Boolean {
        this.transactions.push(tx)
        return true
    }
    
    getHash(): string {
        let txsHashes = []
        for (let tx of this.transactions) {
            txsHashes.push(tx.getHash())
        }
        const hash = cj.SHA256(txsHashes.join("")).toString()
        return hash;
    }

    mine(prevHash: string, difficulty: number) {
        const targetSubstring = '0'.repeat(difficulty)
        
        while (this.getHash().slice(0, difficulty) != targetSubstring) {
            this.nonce += 1
            if (this.nonce % 100 == 0) console.log(this.getHash());
        }
    }

    // TODO
    validateTransactions() {

    }
}

class BlockChain {
    blocks: Array<Block>

    constructor() {
        this.blocks = [this.createGenisisBlock()]
    }

    createGenisisBlock() {
        const genisisBlock = new Block()
        return genisisBlock
    }

    addBlock(block: Block): boolean {
        if (block.getHash() != this.blocks.slice(-1)[0].getHash()) {
            return false
        }
        this.blocks.push(block)
        return true
    }

    validate(): boolean {
        for (let i = 1; i < this.blocks.length; i++) {
            if (this.blocks[i].prevHash != this.blocks[i-1].getHash()) return false
        }
        return true 
    }
}

const tx1 = new Transaction(1, 2, 3)
const tx2 = new Transaction(1, 2, 3)
const tx3 = new Transaction(1, 2, 4)

let block1 = new Block()
block1.addTx(tx1)
block1.addTx(tx2)
block1.addTx(tx3)


let oliCoin = new BlockChain()
oliCoin.addBlock(block1)
console.log(oliCoin);

for (let block of oliCoin.blocks) {
    console.log(block);
    console.log(block.getHash());
}
