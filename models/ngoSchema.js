const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Creating the Schema for Philanthropic 
const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not valid email address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    location: {
        type: String,
    },
    previouswork: {
        type: String,
    },
    endgoal: {
        type: String,
    },
    plans: {
        type: String,
    },
    typeofngo: {
        type: String,
    }

});

//  to hash the password before saving in to the database

ngoSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password , 12);
        this.cpassword = await bcrypt.hash(this.cpassword , 12);
    }

    next();
})


// token generate process

ngoSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({ _id: this._id }, secretkey);
        // console.log(this._id)
        // console.log(this.tokens);
        // console.log(token);
        this.tokens = this.tokens.concat({token});
        await this.save();
        console.log(this.tokens);
        return token;
    } catch (error) {
        console.log(error);
    }
}


// Export the Models

const NGO = new mongoose.model('NGO',ngoSchema);

module.exports = NGO;