import { Listener } from "discord-akairo";
import mongoose from "mongoose";
import { mongoURI } from "../../config";

export default class ReadyListener extends Listener {
    public constructor() {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client",
        });
    }

    public exec(): void {

        mongoose.connect(
            mongoURI,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
              keepAlive: true,
            },
          );

        console.log("Connected to database")

        console.log(`${this.client.user.tag} is now online and ready!`)
    }
}
