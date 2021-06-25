import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import mongoose from "mongoose";
import userSchema from "../../../Models/RoleplaySchemas/UserSchema";

export default class CreateUserCommand extends Command {
    public constructor() {
        super("createuser", {
            aliases: ['createuser', 'user-create'],
            category: "Roleplay Commands",
            description: "Create a user for RP",
            args: [
                {
                    id: "name",
                    match: "option",
                    flag: ["--name"],
                    prompt: {
                        start: (msg: Message) => `Please provide an name!`,
                        retry: (msg: Message) => `Please provide an name!`
                    }
                },
                {
                    id: "age",
                    match: "option",
                    flag: ['--age'],
                    prompt: {
                        start: (msg: Message) => `Please provide an age!`,
                        retry: (msg: Message) => `Please provide an age!`
                    }
                },
                {
                    id: "address",
                    match: "option",
                    flag: ['--address'],
                    prompt: {
                        start: (msg: Message) => `Please provide an address!`,
                        retry: (msg: Message) => `Please provide an address!`
                    }
                },
                {
                    id: "occupation",
                    match: "option",
                    flag: ['--occupation'],
                    prompt: {
                        start: (msg: Message) => `Please provide an occupation!`,
                        retry: (msg: Message) => `Please provide an occupation!`
                    }
                }
            ],
            ratelimit: 5,
            userPermissions: "SEND_MESSAGES"
        })
    }
    public async exec(message: Message, { name, age, address, occupation }): Promise<Message> {
        const UserData = await userSchema.findOne({ guildID: message.guild.id, name: name.toLowerCase() })

        if (UserData) {
            return message.channel.send(
                new MessageEmbed()
                .setTitle(`Error`)
                .setDescription(`There is already a user with that name`)
                .setColor('#0aaa62')
            )
        }

        const newSchema = new userSchema({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            userID: message.author.id,
            name: name.toLowerCase(),
            age: age,
            address: address,
            occupation: occupation
        });
        
        await newSchema.save();

        return message.channel.send(
            new MessageEmbed()
            .setDescription(`New User Created`)
            .setColor('#0aaa62')
            .addField(`Name`, name, true)
            .addField(`Age`, age, true)
            .addField(`Address`, address, true)
            .addField(`Occupation`, occupation, true)
        )
    }
}