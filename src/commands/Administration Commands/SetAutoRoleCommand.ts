import { Command } from "discord-akairo";
import { Message, Role, MessageEmbed, GuildMember } from "discord.js";
import GuildConfigSchema from "../../Models/GuildConfig/GuildSchema";
import mongoose from "mongoose";

export default class SetAutoRoleCommand extends Command {
    public constructor() {
        super("setautorole", {
            aliases: ['setautorole'],
            category: "Administrator",
            description: "Set the auto role for when someone joins", 
            args: [
                {
                    id: "role", 
                    type: "role"
                }
            ],
            ratelimit: 5,
            userPermissions: "MANAGE_GUILD"
        })
    }

    public async exec(message: Message, { role }: { role: Role }): Promise<Message> {
        const GuildConfig = await GuildConfigSchema.findOne({
            guildID: message.guild.id,
          });

        if (!role) {
            return message.channel.send(
                new MessageEmbed()
                .setTitle(`Showing auto role`)
                .setColor('#2ac075')
                .addField(`Server Auto Role`, `\`${GuildConfig.autoRoleName}\``)
            )
        }

        if (GuildConfig) {
            await GuildConfigSchema.updateOne({
                guildID: message.guild.id,
                autoRole: role.id,
                autoRoleName: role.name
            });

        return message.channel.send(
            new MessageEmbed()
            .setColor('#2ac075')
            .addField("Auto role Set To:", `\`${role.name}\``)
            .addField("Set By:", message.member)
            .setTitle("Auto role Configured!")
        )
        }
    }
}