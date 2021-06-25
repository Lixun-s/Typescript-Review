import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import TagSchema from "../../Models/TagSchema";

export default class  extends Command {
    public constructor() {
        super("tag", {
            aliases: ['tag', 'viewtag'],
            category: "Tag",
            description: "Show a tag created by a server admin",
            args: [
                {
                    id: "tagname",
                    match: "restContent"
                }
            ],
            ratelimit: 5,
            userPermissions: "SEND_MESSAGES"
        })
    }
    public async exec(message: Message, { tagname }): Promise<Message> {
        const TagData = await TagSchema.findOne({ guildID: message.guild.id, tagName: tagname.toLowerCase() })

        if (!TagData) {
            return message.channel.send(
                new MessageEmbed()
                .setTitle(`Error`)
                .setColor('#34b57d')
                .setDescription(`There is not a tag with that name`)
            )
        } else {
            return message.channel.send(
                new MessageEmbed()
                .setTitle(TagData.tagName)
                .setDescription(TagData.tagContent)
                .setFooter(TagData.tagFooter)
                .setColor(`${TagData.tagColour}`)
            )
        }
    }
}