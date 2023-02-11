import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: { type: String, default: 'member' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);
export default User;
