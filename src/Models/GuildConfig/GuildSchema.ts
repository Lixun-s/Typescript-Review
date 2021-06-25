import mongoose from "mongoose";

export interface IGuild extends mongoose.Document {
  _id: string;
  guildID: string;
  guildName: string;
  prefix: string;
  autoRole: string;
  autoRoleName: string;
  suggestChannelId: string;
  suggestChannelToken: string;
}

const guildSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: String,
  autoRole: String,
  autoRoleName: String,
  suggestChannelId: String,
  suggestChannelToken: String,
});

const guilds = mongoose.model<IGuild>(`Guild`, guildSchema, "guilds");

export default guilds;