const Joi = require('joi')
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    content: String,
    image: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    }
}, { collection: 'post' })

exports.PostSchema = mongoose.model('post', postSchema)

// exports.sch_register = Joi.object().keys({
//     username: Joi.string().required(),
//     password: Joi.string().required(),
//     email: Joi.string().email().required(),
//     first_name: Joi.string().required(),
//     last_name: Joi.string().required(),
// })