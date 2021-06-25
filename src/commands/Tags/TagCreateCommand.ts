import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import TagSchema from "../../Models/TagSchema";
import mongoose from "mongoose";
import { buttons } from "discord-buttons-pe";

export default class  extends Command {
    public constructor() {
        super("createtag", {
            aliases: ['createtag', 'create-tag'],
            category: "Tag",
            description: "Create a tag",
            args: [
                {
                    id: "name",
                    match: "option",
                    flag: [ "-n", "--name"],
                },
                {
                    id: "content",
                    match: "option",
                    flag: ['-c', "--content"]
                },
                {
                    id: "footer",
                    match: "option",
                    flag: ['-f', '--footer']
                },
                {
                    id: "colour",
                    match: "option",
                    flag: ['-co', '--colour', '-color']
                }
            ],
            ratelimit: 5,
            userPermissions: "MANAGE_GUILD"
        })
    }
    public async exec(message: Message, { name, content, footer, colour }): Promise<Message> {
        const TagData = await TagSchema.findOne({
            guildID: message.guild.id,
            tagName: name
        })

        
        if (TagData) {
            return message.channel.send(
                new MessageEmbed()
                .setTitle(`Error`)
                .setColor('#34b57d')
                .setDescription(`There is already a tag with that name`)
                )
            }
            
            const newSchema = new TagSchema({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                tagName: name.toLowerCase(),
                tagContent: content,
                tagFooter: footer,
                tagColour: colour
            });
            
            await newSchema.save();
            
            const embed = new MessageEmbed()
            .setDescription(`New tag created`)
            .setColor('#34b57d')
            .addField(`Tag Name`, name, true)
            .addField(`Tag Content`, content, true)
            .addField(`Tag Footer`, footer, true)
            .addField(`Tag Colour`, colour, true)

            return message.channel.send(embed)
        }
}