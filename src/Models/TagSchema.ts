import mongoose from "mongoose";

export interface ITag extends mongoose.Document {
  _id: string;
  guildID: string;
  tagName: string;
  tagContent: string;
  tagFooter: string;
  tagColour: string;
}

const tagSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  tagName: String,
  tagContent: String,
  tagFooter: String,
  tagColour: String,
});

const tags = mongoose.model<ITag>(`Tag`, tagSchema, "tags");

export default tags;