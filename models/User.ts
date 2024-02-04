import mongoose, { Document } from "mongoose";
import crypto from "crypto";

interface IUser extends Document {
  name: string;
  email: string;
  address: string;
  setPassword: (password: string) => void;
  validPassword: (password: string) => boolean;
}

let User: mongoose.Model<IUser>;

try {
  User = mongoose.model<IUser>("User");
} catch (error) {
  const UserSchema = new mongoose.Schema(
    {
      name: { type: String, require: true },
      email: { type: String, require: true, unique: true },
      address: { type: String },
      hash: String,
      salt: String,
    },
    { timestamps: true }
  );

  UserSchema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  };

  UserSchema.methods.validPassword = function (password: string) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return this.hash === hash;
  };

  User = mongoose.model<IUser>("User", UserSchema);
}

export default User;
