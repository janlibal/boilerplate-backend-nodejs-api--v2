import userRepository from "../repositories/userRepository"
import logger from "../utils/logger"
import * as errors from '../utils/errors'
import crypto from "../utils/crypto"
import { IUser } from "../interfaces/IUser"


async function create(input: IUser) {
    
    logger.info('create user started')

    const data = {
        email: input.email,
        name: input.name,
        password: await crypto.hashPassword(input.password),
    }

    const user = await userRepository.findByEmail(data.email)
        
    if (user) {
      logger.info('Resource already exists')
      throw new errors.ResourceAlreadyExists()
    }

    let createdUser: any
    createdUser = await userRepository.saveUser(data)
       
    createdUser.accessToken = await crypto.generateAccessToken(createdUser.id)
        
    logger.info('create user finished')
        
    return {
        id: createdUser.id,
        email: createdUser.email,
        token: createdUser.accessToken
    }
    
}

export default { 
    create
}