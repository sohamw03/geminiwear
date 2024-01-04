import mongoose from "mongoose";

let User;

try {
  User = mongoose.model("User");
} catch (error) {
  const UserSchema = new mongoose.Schema(
    {
      name: { type: String, require: true },
      email: { type: String, require: true, unique: true },
      password: { type: String, require: true },
    },
    { timestamps: true }
  );
  User = mongoose.model("User", UserSchema);
}

export default User;
