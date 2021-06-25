import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed } from "discord.js";
import GuildConfigSchema from "../../Models/GuildConfig/GuildSchema";
import mongoose from "mongoose";
import { prefix } from "../../config";

export default class PrefixCommand extends Command {
    public constructor() {
        super("prefix", {
            aliases: ["set-prefix", "prefix"],
            category: "Administrator",
            description: "Set the prefix of the bot",
            args: [
                {
                    id: "prefix", 
                    type: "string"
                }
            ],
            ratelimit: 5,
            userPermissions: "MANAGE_GUILD"
        })
    }

    public async exec(message: Message, { prefix }: { prefix: string }): Promise<Message> {
        const GuildConfig = await GuildConfigSchema.findOne({
            guildID: message.guild.id,
          });

          if (!prefix) {

            return message.channel.send(
                new MessageEmbed()
                .setDescription(`The prefix for my bot is \`${GuildConfig.prefix}\``)
                .setColor('#2ac075')
            )
        }

        if (message.mentions.everyone || message.mentions.members.size >= 1)
        return message.channel.send(`Your prefix cannot contain a mention.`);

        if (!GuildConfig) {
            const newSchema = new GuildConfigSchema({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: prefix,
            });

            await newSchema.save();
            return message.channel.send(
                new MessageEmbed()
                .setColor('#2ac075')
                .addField("Prefix Set To:", `\`${prefix}\``)
                .addField("Set By:", message.member)
                .setTitle("Prefix Configured!")
            );
        }
        await GuildConfigSchema.updateOne({
            guildID: message.guild.id,
            prefix: prefix,
        });
        return message.channel.send(
            new MessageEmbed()
            .setColor('#2ac075')
            .addField("Prefix Set To:", `\`${prefix}\``)
            .addField("Set By:", message.member)
            .setTitle("Prefix Configured!")
        );
    }
}