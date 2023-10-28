import express, { Router } from 'express'
import { validate } from '../../providers/validate'
import { auth } from '../../modules/auth'
import { paymentController, paymentValidation } from '../../modules/payment'

const router: Router = express.Router()

// router
//   .route('/')
//   .post(validate(paymentValidation.createContract), paymentController.createContract)
//   .get(validate(paymentValidation.getContracts), paymentController.getContracts)

router.route('/buysick').post(auth(), validate(paymentValidation.buySickPoints), paymentController.buySickPoints)

export default router
