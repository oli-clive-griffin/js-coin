import * as cj from 'crypto-js'
import * as eccrypto from 'eccrypto'

export default class Person {
    privateKey: Buffer
    publicKey: Buffer

    constructor() {
        this.privateKey = eccrypto.generatePrivate()
        this.publicKey = eccrypto.getPublic(this.privateKey)
    }
    
}