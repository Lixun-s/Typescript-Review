import { Command } from "discord-akairo";
import { Message, MessageEmbed, TextChannel } from "discord.js";

export default class SetupCadCommand extends Command {
    public constructor() {
        super("setupcad", {
            aliases: ['setupcad'],
            category: "Roleplay Commands",
            description: 'Setup the cad for the server',
            args: [
                {
                    id: "CadEmbedChannel",
                    type: "channelMention",
                    prompt: {
                        start: (msg: Message) => `Please provide an channel for the Cad Embed To Go!`,
                        retry: (msg: Message) => `Please provide an channel for the Cad Embed To Go!`
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { CadEmbedChannel }: { CadEmbedChannel: TextChannel }): Promise<Message> {
        
        return this.client.channels.cache.get(CadEmbedChannel).send(
            new MessageEmbed()
            .setTitle(`Cad Embed`)
        )
    }
}