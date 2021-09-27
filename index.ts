import Block from './src/Block'
import Transaction from './src/Transaction'
import BlockChain from './src/Blockchain'


const DIFFICULTY = 1
const NUMBER_BLOCKS = 3
const TRANSACTIONS_PER_BLOCK = 3

let oliCoin = new BlockChain()
oliCoin.setDifficulty(DIFFICULTY)

for (let i = 0; i < NUMBER_BLOCKS; i++) {
    let block = new Block()
    for (let i = 0; i < TRANSACTIONS_PER_BLOCK; i++) {
        const from = Math.floor(Math.random() * 100).toString()
        const to = Math.floor(Math.random() * 100).toString()
        const amount = Math.floor(Math.random() * 100)
        block.addTx(new Transaction(from, to, amount))
    }
    block.setPrevHash(oliCoin.blocks[i].getHash())
    block.mine(oliCoin.difficulty)

    oliCoin.addBlock(block)

    const printBlock = {
        transactions: block.transactions,
        prevHash: block.prevHash,
        hash: block.getHash(),
    }
    console.log(`Block ${i + 1}: \n${JSON.stringify(printBlock, undefined, 2)}\n`);
}

console.log(`number of blocks: ${oliCoin.blocks.length}`);

