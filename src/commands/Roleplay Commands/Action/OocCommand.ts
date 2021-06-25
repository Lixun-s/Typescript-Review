import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class OocCommand extends Command {

    public constructor() {
        super("ooc", {
            aliases: ['ooc'],
            category: 'Roleplay Commands',
            description: 'Show an in game action',
            args: [
                {
                    id: 'Action',
                    type: 'string',
                    prompt: {
                        start: (msg: Message) => `<:crosstingy:798309247757713408> Incorrect usage!\n Please provide an action!`,
                        retry: (msg: Message) => `<:crosstingy:798309247757713408> Incorrect usage!\n Please provide an action!`
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { Action }): Promise<Message> {

        if (message.deletable) message.delete()

        return message.channel.send(`**[OOC] - ${message.author}** | ${Action}`)
    }
}