const { Router } = require('express')
const { validate_token } = require('../../middleware/validate_token')
const { authorize } = require('../../middleware/authorize')
const commentController = require('./commentController')

const commentRouter = Router()

commentRouter.post('/createComment',
    validate_token(),
    commentController.createComment
)

commentRouter.put('/editComment',
    validate_token(),
    authorize('comments'),
    commentController.editComment
)

commentRouter.delete('/deleteComment',
    validate_token(),
    authorize('comments'),
    commentController.deleteComment
)

module.exports = commentRouter