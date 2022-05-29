const Joi = require('joi')
const mongoose = require('mongoose')
const moment = require('moment')

const authSchema = mongoose.Schema({
    authen_id: String,  //for third party OAuth
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
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
}, { collection: 'user' })

exports.AuthSchema = mongoose.model('user', authSchema)

exports.sch_register = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
})