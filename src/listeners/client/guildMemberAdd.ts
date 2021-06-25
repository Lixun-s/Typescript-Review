import { Listener } from "discord-akairo";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import GuildConfigSchema from "../../Models/GuildConfig/GuildSchema";
import mongoose from "mongoose";

export default class MessageDeleteListener extends Listener {
    public constructor() {
        super("guildMemberAdd", {
            event: "guildMemberAdd",
            emitter: "client",
            category: "guild"
        })
    }

    public async exec(guildMember: GuildMember): Promise<GuildMember> {

        const GuildConfig = await GuildConfigSchema.findOne({
            guildID: guildMember.guild.id,
        });

        if (GuildConfig.autoRole === "Not set") return;

        guildMember.roles.add(GuildConfig.autoRole)
    }
}