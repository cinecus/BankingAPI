const commentModel = require('./commentModel')

const { err, debug } = require('../../config/debug')
const { success, failed } = require('../../config/response')
const authModel = require('../auth/authModel')
const postModel = require('../post/postModel')

class commentController {
    async createComment(req, res) {
        try {
            const { post_id, content } = req.body
            const user_id = req.user_id
            const { comment } = await commentModel.createComment({ post_id, content, user_id })
            const { user } = await authModel.findOneUser({ _id: user_id })
            const { post } = await postModel.findOnePost({ _id: post_id })
            user.comments.push(comment._id)
            post.comments.push(comment._id)
            await user.save()
            await post.save()
            return success(res, 'สร้าง Comment สำเร็จ')
        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }
    }

    async editComment(req, res) {
        try {
            const { id, content } = req.body
            const user_id = req.user_id
            await commentModel.editComment({ id, content })
            return success(res, `แก้ไข Comment id: ${id} สำเร็จ`)
        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }
    }

    async deleteComment(req, res) {
        try {
            const { id } = req.body
            const user_id = req.user_id
            const { user } = await authModel.findOneUser({ _id: user_id })
            const { comment } = await commentModel.findOneComment({ _id: id })
            await commentModel.deleteComment(id)
            const { post } = await postModel.findOnePost({ _id: comment.post_id })
            const temp_comments_in_user = await user.comments.filter(commentId => {
                return commentId.toString() !== id.toString()
            })
            const temp_comments_in_post = await post.comments.filter(commentId => {
                return commentId.toString() !== id.toString()
            })
            await authModel.updateUser(user_id, { comments: temp_comments_in_user })
            await postModel.updatePost(comment.post_id, { comments: temp_comments_in_post })
            return success(res, `ลบ Comment id:${id} สำเร็จ`)

        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }
    }
}

module.exports = new commentController()
