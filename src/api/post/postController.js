const postModel = require('./postModel')
// const mongoose = require('mongoose')
// const ObjectId = mongoose.Types.ObjectId

const { err, debug } = require('../../config/debug')
const { success, failed } = require('../../config/response')
const authModel = require('../auth/authModel')


class postController {
    async createPost(req, res) {
        try {
            const { content, image } = req.body
            const user_id = req.user_id
            const { post } = await postModel.createPost({ content, image, user_id })
            const { user } = await authModel.findOneUser({ _id: user_id })
            //console.log('user', user)
            user.posts.push(post._id)
            await user.save()

            return success(res, 'สร้าง Post สำเร็จ')
        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }
    }

    async getAllPosts(req, res) {
        try {
            const { posts } = await postModel.getAllPosts()
            return success(res, 'ดึง Post ทั้งหมด สำเร็จ', posts)
        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }
    }

    async editPost(req, res) {
        try {
            const { id, content, image } = req.body
            const user_id = req.user_id
            await postModel.editPost({ id, content, image })
            return success(res, `แก้ไข Post id: ${id} สำเร็จ`)

        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }
    }

    async deletePost(req, res) {
        try {
            const { id } = req.body
            const user_id = req.user_id
            await postModel.deletePost(id)
            const { user } = await authModel.findOneUser({ _id: user_id })
            const temp_posts = await user.posts.filter(postId => {
                return postId.toString() !== id.toString()
            })
            await authModel.updateUser(user_id, { posts: temp_posts })

            return success(res, `ลบ Post id:${id} สำเร็จ`)

        } catch (error) {
            debug(error)
            return failed(res, 'found some issue on action')
        }
    }

}

module.exports = new postController()


