const Joi = require('joi')
const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    post_id: mongoose.Schema.Types.ObjectId,
    content: String,
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
}, { collection: 'comment' })

exports.CommentSchema = mongoose.model('comment', commentSchema)

// exports.sch_register = Joi.object().keys({
//     username: Joi.string().required(),
//     password: Joi.string().required(),
//     email: Joi.string().email().required(),
//     first_name: Joi.string().required(),
//     last_name: Joi.string().required(),
// })