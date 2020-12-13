import type { Message } from "discord.js-light";
import { CommandConf } from "../../decorators";
import Command from "../../structures/Command";
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const ytdl = require("ytdl-core");
const { MessageAttachment } = require("discord.js-light");
const fs = require("fs");
@CommandConf({ 
    name: "youtubedl",
    aliases: ["ytdl"],
    description: "download music from youtube",
    usage: "",
    cooldown: 3,
    ownerOnly: false
})

export default class ytdlCommand extends Command {
    public async exec(msg: Message, args: string[]): Promise<any> {
        try {
        const url = args.join(" ")
        if(!url) return msg.reply("input youtube url");
        const fileName = randomName(6)
        const song = await ytdl(url, { quality: "highestaudio", format: "mp3" }).pipe(fs.createWriteStream("music/"+ fileName + ".mp3"))
        const mess = await msg.channel.send("Please wait... saving file to disk...")
        await delay(3000)
        const buffer = fs.readFileSync("music/"+ fileName +".mp3")
        const file = new MessageAttachment(buffer, 'file.mp3')
        msg.channel.send(file)
       await fs.unlinkSync("music/"+ fileName + ".mp3")
function randomName(length: number) {
    var result = "" as any ;
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return "KGY" + result;
  } 
  
  } catch (e){
        msg.channel.send(`An error occured \`${e}\` Try again later!`)
    }
  }
 }