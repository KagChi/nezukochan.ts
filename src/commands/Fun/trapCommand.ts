import type { Message } from "discord.js-light";
import { CommandConf } from "../../decorators";
import Command from "../../structures/Command";
@CommandConf({ 
    name: "trap",
    aliases: [""],
    description: "random trap image 🗿",
    usage: "",
    cooldown: 3,
    ownerOnly: false
})

export default class TrapCommand extends Command {
    public async exec(msg: Message, args: string[]): Promise<void> {
        const image = await this.client.fun.trap()
      const embed = this.client.util.embed()
      .setTitle("Random Trap Image :)")
      .setImage(image)
      .setColor(this.client.util.color)
      msg.channel.send(embed)  
  }
 }