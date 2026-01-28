import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true }, // 'admin', 's1'
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords!
    role: { type: String, enum: ['admin', 'student'], default: 'student' },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Prevent overwriting model during hot reload
const User = models.User || model('User', UserSchema);

export default User;