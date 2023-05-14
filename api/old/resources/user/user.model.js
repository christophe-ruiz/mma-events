const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            index: true,
        },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.checkPassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
}

exports.User = mongoose.model('user', userSchema);
