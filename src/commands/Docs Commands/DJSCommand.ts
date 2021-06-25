import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { URLSearchParams } from "url";
import fetch from "node-fetch";
const API_URL = "https://djsdocs.sorta.moe/v2/embed";

export default class  extends Command {
    public constructor() {
        super("djs", {
            aliases: ['djs', 'discord.js'],
            category: "Docs",
            description: "Search discord.js for documentation",
            args: [
                {
                    id: "query",
                    match: "rest",
                    prompt: {
                      start:
                        "Please give me query for searching the discord.js, command, and akairo documentation.",
                      retry: "Please try again... Example: `Client#login`"
                    },
                },
                {
                    id: "type",
                    type: ["stable", "master", "rpc", "commando", "akairo-master"],
                    match: "option",
                    flag: ["-t", "--type"],
                    default: "stable"
                }
            ],
            ratelimit: 5,
            userPermissions: "SEND_MESSAGES"
        })
    }
    public async exec(message: Message, { query, type }): Promise<Message> {
        if (query === "djs") {
            return message.util?.send(
              new MessageEmbed()
                .setColor('#0843cc')
                .setImage("https://i.redd.it/1gxyc19z70s51.jpg")
            );
          }
      
          const qs = new URLSearchParams({
            src: type.toLowerCase(),
            q: query.replace(/#/g, "."),
            force: "false"
          });
      
          const res = await fetch(`${API_URL}?${qs}`).then(r => r.json());
          if (!res) {
            const embed = new MessageEmbed()
              .setDescription(`Sorry, I couldn't find anything for \`${query}\``)
              .setColor('#0843cc');
      
            return message.util?.send(embed);
          }
      
          const embed = new MessageEmbed(res).setColor('#0843cc');
      
          return message.util?.send(embed);
    }
}