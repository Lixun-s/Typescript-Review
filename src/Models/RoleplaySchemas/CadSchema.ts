import mongoose from "mongoose";

export interface ICad extends mongoose.Document {
  _id: string;
  guildID: string;

}

const cadSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,

});

const cads = mongoose.model<ICad>(`Cad`, cadSchema, "Cads");

export default cads;