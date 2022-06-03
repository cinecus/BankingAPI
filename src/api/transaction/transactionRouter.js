const { Router } = require('express')
const { validate_token } = require('../../middleware/validate_token')
const transactionController = require('./transactionController')

const transactionRouter = Router()

transactionRouter.post('/deposit',
    transactionController.deposit
)

transactionRouter.post('/withdraw',
    transactionController.withdraw
)

transactionRouter.post('/transfer',
    transactionController.transfer
)

transactionRouter.get('/getBalance',
    validate_token(),
    transactionController.getBalance
)

module.exports = transactionRouter