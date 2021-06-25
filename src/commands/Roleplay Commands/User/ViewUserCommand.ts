import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";
import userSchema from "../../../Models/RoleplaySchemas/UserSchema";

export default class ViewUserCommand extends Command {
    public constructor() {
        super("viewuser", {
            aliases: ['viewuser', 'whoisuser'],
            description: 'View a user from the database',
            category: 'Roleplay Commands',
            args: [
                {
                    id: 'name',
                    match: 'text'
                }
            ]
        })
    }

    public async exec(message: Message, { name }): Promise<Message> {

        if (!name) {
            return message.util?.send(
                new MessageEmbed()
                .setTitle(`Error`)
                .setColor(`#0aaa62`)
                .addField(`Missing Params`, `You need to type a civilian name to search my database with.`)
            )
        }

        const UserData = await userSchema.findOne({ guildID: message.guild.id, name: name.toLowerCase() })

        if (!UserData) {
            return message.util?.send(
                new MessageEmbed()
                .setTitle(`Error`)
                .setColor(`#0aaa62`)
                .addField(`Missing User`, `There is no user in my database with the name ${name}`)
            )
        }

        const embed = new MessageEmbed()
        .setTitle(`Showing Civilian Records`)
        .setColor(`#0aaa62`)
        .addField(`Name`, UserData.name, true)
        .addField(`Age`, UserData.age, true)
        .addField(`Address`, UserData.address, true)
        .addField(`Occupation`, UserData.occupation, true)

        return message.util?.send(embed)
    }
}