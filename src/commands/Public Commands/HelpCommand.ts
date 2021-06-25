import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { stripIndents } from "common-tags";

export default class HelpCommand extends Command {
    public constructor() {
        super("help", {
            aliases: ['help', 'commands', 'cmds'],
            category: 'Public Commands',
            description: "View the available commands for the bot",
            ratelimit: 3,
            args: [
                {
                    id: "command",
                    type: "commandAlias",
                    default: null
                }
            ]
        })
    }

    public exec(message: Message, { command }: { command: Command }): Promise<Message> {
        if (command) {
            return message.channel.send(
                new MessageEmbed()
                .setAuthor(`Help | ${command}`, this.client.user.displayAvatarURL())
                .setColor('#0843cc')
                .setDescription(stripIndents`
                    **Description:**
                    ${command.description || "No description available"}

                    **Usage:**
                    ${command.description.usage || "No usage available"}

                    **Examples:**
                    ${command.description.examples ? command.description.examples.map(e => `\`${e}\``).join("\n") : "No examples available"}
                `)
            )
        }

        const embed = new MessageEmbed()
            .setAuthor(`Help | ${this.client.user.username}`, this.client.user.displayAvatarURL())
            .setColor('#0843cc')
            .setFooter(`${this.client.commandHandler.prefixes}help [Command] For more information on a command`)

        for (const category of this.handler.categories.values()) {
            if (["default"].includes(category.id)) continue;

            embed.addField(category.id, category
                .filter(cmd => cmd.aliases.length > 0)
                .map(cmd => `\`${cmd}\``)
                .join(' | ') || "No commands in this category"
            )
        }

        return message.channel.send(embed)
    }
}