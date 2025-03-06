import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    favorites: mongoose.Schema.Types.ObjectId[];
    properties: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
