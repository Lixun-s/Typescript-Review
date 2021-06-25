import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

export default class EchoCommand extends Command {
    public constructor() {
        super("echo", {
            aliases: ['echo', 'embed'],
            category: "Administrator",
            description: "Send a message in an embed or not", 
            args: [
                {
                  id: "embed",
                  match: "flag",
                  flag: ["-e", "--embed"]
                },
                {
                  id: "content",
                  match: "rest",
                }
            ],
            ratelimit: 5,
            userPermissions: "MANAGE_GUILD"
        })
    }

    public async exec(message: Message, { embed, content }): Promise<Message> {
        if (message.deletable) await message.delete();
        return embed
          ? message.util?.send(
              new MessageEmbed()
              .setDescription(content)
              .setColor('#2ac075')
              .setTimestamp()
          )
          : message.util?.send(content);
   }
}