/* /SERVER/MODELS/USERS.JS*/
/* ABIRAMI KENNEDY        */
/* 300934720              */
/* MY FAVOURITE BOOKS     */

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


//User schema for login and register
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'UserName is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email is required'
    },
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "user"
}
);

let options = ({
    missingPasswordError: "Please input correct password"
});

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', userSchema);