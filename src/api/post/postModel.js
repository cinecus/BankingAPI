const { PostSchema } = require('./postSchema')
const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Types.ObjectId

class postModel {
    async createPost(obj) {
        try {
            const post = await PostSchema.create(obj)
            return { complete: true, post }
        } catch (error) {
            console.log(error)
            return { complete: false }
        }

    }

    async getAllPosts() {
        try {
            const posts = await PostSchema.find({}).populate({
                path: 'comments',
                populate: { path: "post_id" }
            }).sort({ createdAt: -1 })
            return { complete: true, posts }
        } catch (error) {
            console.log(error)
            return { complete: false }
        }
    }

    async editPost(obj) {
        const { id, content, image } = obj
        try {
            await PostSchema.findByIdAndUpdate(ObjectId(id), {
                content,
                image
            })
            return { complete: true }
        } catch (error) {
            console.log(error)
            return { complete: false }
        }

    }

    async deletePost(id) {
        try {
            await PostSchema.findByIdAndDelete(ObjectId(id))
            return { complete: true }
        } catch (error) {
            console.log(error)
            return { complete: false }
        }
    }

    async findOnePost(obj) {
        try {
            const post = await PostSchema.findOne(obj)
            return { completed: true, post }
        } catch (error) {
            return { completed: false }
        }
    }

    async updatePost(id, obj) {
        try {
            await PostSchema.findByIdAndUpdate(ObjectId(id), { ...obj })
            return { completed: true }
        } catch (error) {
            console.log(error)
            return { completed: false }
        }
    }
}

module.exports = new postModel()