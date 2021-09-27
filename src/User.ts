import * as cj from 'crypto-js'
import * as eccrypto from 'eccrypto'
import Transaction from './Transaction'

import { Address } from './types'

export default class Person {
    privateKey: Buffer
    publicKey: Buffer

    constructor() {
        this.privateKey = eccrypto.generatePrivate()
        this.publicKey = eccrypto.getPublic(this.privateKey)
    }

    createSendTx(to: Address, amount: number) {
        const from = this.publicKey.toString()
        new Transaction(from, to, amount)
        // TODO
        // Transaction.sign()
    }

}