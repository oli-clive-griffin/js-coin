import Block from './Block'
import * as crypto from 'crypto'
import * as eccrypto from 'eccrypto'

export default class BlockChain {
    blocks: Array<Block>
    difficulty: number

    constructor() {
        this.blocks = [this.createGenisisBlock()]
        this.difficulty = 0
    }

    createGenisisBlock(): Block {
        const genisisBlock = new Block()
        return genisisBlock
    }

    addBlock(block: Block): boolean {
        const prevHash: Buffer = block.prevHash 
        const thisHash: Buffer = this.blocks.slice(-1)[0].getHash()
        if (Buffer.compare(prevHash, thisHash) !== 0) {
            console.log(`${block.prevHash} does not equal \n${this.blocks.slice(-1)[0].getHash()}`)
            throw Error("couldn't add block. wrong prevHash")
        }
        if (block.getHash().toString().slice(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
            throw Error("couldn't add block. block not mined")
        }
        this.blocks.push(block)
        return true
    }

    setDifficulty(difficulty: number): number {
        this.difficulty = difficulty
        return this.difficulty
    }

    validate(): boolean {
        for (let i = 1; i < this.blocks.length; i++) {
            if (this.blocks[i].prevHash != this.blocks[i-1].getHash()) return false
        }
        return true
    }
}
