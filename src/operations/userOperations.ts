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

async function login(input: IUser) {

    logger.info('login started')
  
    const data = {
        email: input.email.toLowerCase(),
        password: input.password
    }
  
    const user = await userRepository.findByEmail(data.email)
  
    if (!user) {
        logger.info('Unauthorized')
        throw new errors.Unauthorized()
    }
  
    const verified = await crypto.comparePasswords(data.password, user.password)
  
    if (!verified) {
        logger.info('Unauthorized')
        throw new errors.Unauthorized()
    }
  
    const token = await crypto.generateAccessToken(user.id)
  
    logger.info('login finished')
  
    return {
        id: user.id,
        email: user.email,
        token,
      }
    }

export default { 
    create,
    login
}