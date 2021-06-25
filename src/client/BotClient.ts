import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { Message } from "discord.js";
import { join } from "path";
import { prefix, owners, dbName } from "../config";
import GuildConfigSchema from "../Models/GuildConfig/GuildSchema";
import mongoose from "mongoose";


declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
    }
}

interface BotOptions {
    token?: string;
    owners?: string | string[]
}

export default class BotClient extends AkairoClient {

    public config: BotOptions;
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "listeners")
    })
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "commands"),
        prefix: async msg => {
            const GuildConfig = await GuildConfigSchema.findOne({
                guildID: msg.guild.id,
              });

              const prefix = GuildConfig.prefix;

            return prefix
        },
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 1000,
        argumentDefaults: {
            prompt: {
                modifyStart: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the command...`,
                modifyRetry: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the command...`,
                timeout: "You took too long, therefore the command has now been cancelled",
                ended: "You exceeded the maximum amomunt of tries, this command has now been cancelled",
                cancel: "Command cancelled",
                retries: 3,
                time: 3e4
            },
            otherwise: ""
        },
    });

    public constructor(config: BotOptions) {
        super({
            ownerID: config.owners
        });

        this.config = config;
    }

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    public async start(): Promise<String> {
        await this._init();
        return this.login(this.config.token);
    }
}