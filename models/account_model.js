const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Account = new Schema(
    {
        name: String,
        balance: Number
    }
)

module.exports = mongoose.model('Account', Account)