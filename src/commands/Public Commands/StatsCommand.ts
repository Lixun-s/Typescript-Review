import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { version } from "../../config";
import moment from "moment";

export default class StatsCommands extends Command {

    public constructor() {
        super("stats", {
            aliases: ['stats', 'bot-info'],
            category: 'Public Commands',
            description: 'Show information on the bot',
            ratelimit: 3
        })
    }

    public exec(message: Message): Promise<Message> {

        let days = Math.floor(this.client.uptime / 86400000);
        let hours = Math.floor(this.client.uptime / 3600000) % 24;
        let minutes = Math.floor(this.client.uptime / 60000) % 60;
        let seconds = Math.floor(this.client.uptime / 1000) % 60;
  

        return message.channel.send(
            new MessageEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .setTitle(`Bot Stats`)
            .setColor('#0843cc')
            .addField(`Bot Version`, `v${version}`, true)
            .addField(`Uptime`, `${days}d, ${hours}h, ${minutes}m, ${seconds}s`, true)
            .addField(`Server Count`, `${this.client.guilds.cache.size}`, true)
            .addField(`Libraries`, `[discord.js](https://discord.js.org)[-akairo](https://discord-akairo.github.io \'akairo\')`, true)
        )
    }
}