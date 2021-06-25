import { Command } from "discord-akairo";
import { MessageEmbed, Message, GuildMember } from "discord.js";
import mongoose from "mongoose";
import userSchema from "../../../Models/RoleplaySchemas/UserSchema";

export default class EditUserCommand extends Command {
    public constructor() {
        super("edituser", {
            aliases: ['edituser', 'useredit'],
            category: 'Roleplay Commands',
            description: 'Edit a scope of your user',
            args: [
                {
                    id: "basescope",
                    match: "option",
                    flag: ["--scope"],
                },
                {
                    id: "name",
                    match: "option",
                    flag: ["--name"],
                },
                {
                    id: "newvalue",
                    match: "option",
                    flag: ['--tovalue'],
                },
            ]
        })
    }

    public async exec(message: Message, { basescope, name, newvalue }): Promise<Message> {

        if (!basescope || !newvalue || !name) {
            return message.util?.send(
                new MessageEmbed()
                .setTitle(`Error`)
                .setColor(`#0aaa62`)
                .addField(`Missing Params`, `Please pass the correct flags.\n\nFlags: **--tovalue** | **--scope**\n\nExample: edituser --name "Sarah Jane" --scope "name" --tovalue "Sarah Jones"`)
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

        var scope = basescope.toLowerCase()

        if (scope != 'age' && scope != 'occupation' && scope != 'address') {
            return message.util?.send(
                new MessageEmbed()
                .setTitle(`Error`)
                .setColor(`#0aaa62`)
                .addField(`Incorrect Scope`, `Your scope must include **Age** | **Address** | **Occupation**`)
            )
        }

        if (scope === 'age') { 
            await userSchema.findOneAndUpdate({
                guildID: message.guild.id, 
                name: name.toLowerCase(),
            }, { 
                guildID: message.guild.id, 
                name: name.toLowerCase(),
                age: newvalue
            })
        }

        if (scope === 'occupation') {
            await userSchema.findOneAndUpdate({
                guildID: message.guild.id, 
                name: name.toLowerCase(),
            }, { 
                guildID: message.guild.id, 
                name: name.toLowerCase(),
                occupation: newvalue
            })  
        }

        if (scope === 'address') {
            await userSchema.findOneAndUpdate({
                guildID: message.guild.id, 
                name: name.toLowerCase(),
            }, { 
                guildID: message.guild.id, 
                name: name.toLowerCase(),
                address: newvalue
            })
        }

        return message.util?.send(
            new MessageEmbed()
            .setTitle(`Success`)
            .setColor(`#0aaa62`)
            .addField(`Scope ${scope} Updated`, `Scope ${scope} Has Been Updated To **${newvalue}**`)
        )
    }
}