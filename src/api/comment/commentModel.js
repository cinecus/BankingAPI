const { CommentSchema } = require('./commentSchema')
const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Types.ObjectId


class commentModel {
    async createComment(obj) {
        try {
            const comment = await CommentSchema.create(obj)
            return { complete: true, comment }
        } catch (error) {
            console.log(error)
            return { complete: false }
        }
    }

    async editComment(obj) {
        const { id, content } = obj
        try {
            await CommentSchema.findByIdAndUpdate(ObjectId(id), {
                content
            })
            return { complete: true }
        } catch (error) {
            console.log(error)
            return { complete: false }
        }
    }

    async deleteComment(id) {
        try {
            await CommentSchema.findByIdAndDelete(ObjectId(id))
            return { complete: true }
        } catch (error) {
            console.log(error)
            return { complete: false }
        }
    }

    async findOneComment(obj) {
        try {
            const comment = await CommentSchema.findOne(obj)
            return { completed: true, comment }
        } catch (error) {
            return { completed: false }
        }
    }
}

module.exports = new commentModel()