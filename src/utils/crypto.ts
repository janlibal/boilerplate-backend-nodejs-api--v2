import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'
import config from '../config'


const signOptions: SignOptions = {
    algorithm: config.auth.createOptions.algorithm, 
    expiresIn: config.auth.createOptions.expiresIn,
    issuer: `${config.auth.createOptions.issuer}.${config.server.environment}`
}




async function generateAccessToken(userId: string) {
    const payload = { userId }
     return jwt.sign(payload, config.auth.secret, signOptions)
}


function hashPassword(password: string) {
    return bcrypt.hash(peperify(password), config.auth.saltRounds)
}




function peperify(password: string) {
    return crypto.createHmac('sha1', config.auth.secret)
      .update(password)
      .digest('hex')
}


export default {
    hashPassword,
    generateAccessToken
}