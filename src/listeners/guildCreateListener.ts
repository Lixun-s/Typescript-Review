import { Listener } from "discord-akairo";
import { Message, MessageEmbed, TextChannel, Guild } from "discord.js";
import GuildConfigSchema from "../Models/GuildConfig/GuildSchema";
import mongoose from "mongoose";
import { prefix } from "../config"

export default class GuildCreateListener extends Listener {

    public constructor() {
        super("guildCreate", {
            event: "guildCreate",
            emitter: "client",
        })
    }

    public async exec(guild: Guild): Promise<void> {

        const GuildConfig = await GuildConfigSchema.findOne({
            guildID: guild.id,
        });

        if (!GuildConfig) {
        const newSchema = new GuildConfigSchema({
            _id: mongoose.Types.ObjectId(),
            guildID: guild.id,
            guildName: guild.name,
            prefix: prefix,
            autoRole: "Not set",
            autoRoleName: "Not set",
          });
      
          await newSchema.save();

          console.log(`New data has created for guild ${guild.name} (${guild.id})`)
        }
    }
}