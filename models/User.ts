import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

let User: mongoose.Model<IUser>;

try {
  User = mongoose.model<IUser>("User");
} catch (error) {
  const UserSchema = new mongoose.Schema(
    {
      name: { type: String, require: true },
      email: { type: String, require: true, unique: true },
      password: { type: String, require: true },
    },
    { timestamps: true }
  );
  User = mongoose.model<IUser>("User", UserSchema);
}

export default User;
