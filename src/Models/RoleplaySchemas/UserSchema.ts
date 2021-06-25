import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  _id: string;
  guildID: string;
  userID: string;
  name: string;
  age: string;
  address: string;
  occupation: string;
}

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  userID: String,
  name: String,
  age: String,
  address: String,
  occupation: String,
});

const users = mongoose.model<IUser>(`User`, userSchema, "users");

export default users;