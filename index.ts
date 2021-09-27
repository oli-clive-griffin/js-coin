import Block from './src/Block'
import Transaction from './src/Transaction'
import BlockChain from './src/Blockchain'


// let oliCoin = new BlockChain()
// oliCoin.setDifficulty(4)

// const NUMBER_BLOCKS = 3
// const TRANSACTIONS_PER_BLOCK = 3

// for (let i = 0; i < NUMBER_BLOCKS; i++) {
//     let block = new Block()
//     for (let i = 0; i < TRANSACTIONS_PER_BLOCK; i++) {
//         const from = Math.floor(Math.random() * 100)
//         const to = Math.floor(Math.random() * 100)
//         const amount = Math.floor(Math.random() * 100)
//         block.addTx(new Transaction(from, to, amount))
//     }
//     block.setPrevHash(oliCoin.blocks[i].getHash())
//     block.mine(oliCoin.difficulty)
//     oliCoin.addBlock(block)

//     console.log(`Block ${i + 1}: \n${JSON.stringify(block, undefined, 2)}\n`);
// }

// console.log(`number of blocks: ${oliCoin.blocks.length}`);

