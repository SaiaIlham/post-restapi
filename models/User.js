const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 45
    },
    created_date:{
        type: Date,
        default: Date.now
    },
    modified_date:{
        type: Date,
        default: null
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('User', userSchema, 'user')