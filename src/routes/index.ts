import { Router } from 'express'
import { default as UserRouter } from './user'

const router = Router()

router.use('/user', UserRouter)

export default router