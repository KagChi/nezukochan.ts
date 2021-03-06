import type { Guild, Message } from "discord.js-light";
import { CommandConf } from "../../decorators";
import Command from "../../structures/Command";
@CommandConf({ 
    name: "loop",
    aliases: [],
    description: "loop current queue",
    usage: "",
    cooldown: 3,
    ownerOnly: false
})

export default class loopCommand extends Command {
    public async exec(msg: Message, args: string[]) {
        const voiceChannel = msg.member?.voice.channel
        const serverQueue = msg.guild?.queue
        if (!voiceChannel) return msg.channel.send("You must join voiceChannel first");
        if (msg.guild?.queue && voiceChannel.id !== msg.guild.queue?.voiceChannel.id)return msg.channel.send(`You must be in **${msg.guild.queue?.voiceChannel.name}** to loop the music`);
        const noQueue = this.client.util.embed()
        .setTitle("Error!")
        .setDescription("There are no music playing")
        .setColor(this.client.util.color)
        .setThumbnail(msg.author?.avatarURL({ dynamic: true }) as any)
        if(!serverQueue) return msg.channel.send(noQueue);
        serverQueue!.loop = !serverQueue?.loop;
        const embed = this.client.util.embed()
        .setTitle("Looping Queue")
        .setDescription(`🔁 turned loop \`${serverQueue!.loop ? "on" : "off"}\` `)
        .setThumbnail(msg.author?.avatarURL({ dynamic: true }) as any)
        .setColor(this.client.util.color)
        msg.channel.send(embed)
    }
}