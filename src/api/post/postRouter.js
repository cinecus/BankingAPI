const { Router } = require('express')
const { validate_token } = require('../../middleware/validate_token')
const { authorize } = require('../../middleware/authorize')
const postController = require('./postController')

const postRouter = Router()

postRouter.post('/createPost',
    validate_token(),
    postController.createPost
)

postRouter.get('/getAllPosts',
    validate_token(),
    postController.getAllPosts
)

postRouter.put('/editPost',
    validate_token(),
    authorize('posts'),
    postController.editPost
)

postRouter.delete('/deletePost',
    validate_token(),
    authorize('posts'),
    postController.deletePost
)
module.exports = postRouter