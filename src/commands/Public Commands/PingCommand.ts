import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class PingCommand extends Command {

    public constructor() {
        super("ping", {
            aliases: ['ping', 'latency'],
            category: 'Public Commands',
            description: 'Show the latency of the bot',
            ratelimit: 3
        })
    }

    public exec(message: Message): Promise<Message> {

        return message.channel.send(
            new MessageEmbed()
            .setTitle(`Ping For ${this.client.user.username}`)
            .setDescription(`My Ping Is **${this.client.ws.ping}ms**`)
            .setColor('#0843cc')
            .setTimestamp()
        )
    }
}