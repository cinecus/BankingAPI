const { AuthSchema } = require('./authSchema')
const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Types.ObjectId

class authModel {
    async findOneUser(obj) {
        try {
            const user = await AuthSchema.findOne(obj).populate({
                path: 'posts',
                populate: { path: "user_id" }
            })
            return { completed: true, user }
        } catch (error) {
            console.log(error)
            return { completed: false }
        }
    }

    async registerUser(obj) {
        try {
            const result = await AuthSchema.create(obj)
            return { completed: true, result }
        } catch (error) {
            console.log(error)
            return { completed: false }
        }
    }

    async insertDevice(obj) {
        try {
            const { _id, device_id, token_noti } = obj
            const device_exist = await AuthSchema.findOne({
                _id: ObjectId(_id),
                'device_info.divice_id': device_id
            })
            console.log(device_exist)
            if (!device_exist) {
                await AuthSchema.findOneAndUpdate({ _id: ObjectId(_id) }, { $push: { device_info: obj } }, { upsert: true })
            } else {
                await AuthSchema.findOneAndUpdate({ _id: ObjectId(_id), 'device_info.divice_id': device_id }, { $set: { 'device_info.$.token_noti': token_noti } }, { upsert: true })
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateUser(id, obj) {
        try {
            await AuthSchema.findByIdAndUpdate(ObjectId(id), { ...obj })
            return { completed: true }
        } catch (error) {
            console.log(error)
            return { completed: false }
        }
    }
}

module.exports = new authModel()