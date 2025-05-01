const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`UpTime is working.`));
const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('pro.db')
const fs = require('fs')
let prefix = "$"//البريفكس
const mainColor = "#4c57d0";


client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`);
  client.user.setPresence({
    status: 'idle',
    activity: {
      name: '$help',
      type: 'PLAYING'
    }
  });
});
//////////////////////////////////////////////////////////////////////////////

client.on('message', async(message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
    if(message.channel.type === "dm") return;
    let botmen = message.mentions.users.first()
    if(botmen) {
        if(botmen.id === client.user.id) {
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setDescription(`**My Prefix Is : \`${prefix}\`.**`)
            .setTimestamp()
            .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())
                                )
        } 
    }
    
    
      if(command === "config") {
          let protectionmode = "⚠️"
          let logs = db.get(`logsch_${message.guild.id}`)
          if(!logs) logs = "No Logs Channel Is Selected!."
        if(db.has(`on_${message.guild.id}`)) protectionmode = "✅"
        let bans = db.get(`limitedban_${message.guild.id}`) || "None"
        let kicks = db.get(`limitedkick_${message.guild.id}`)|| "None"
        let channelc = db.get(`limitedchc_${message.guild.id}`)|| "None"
        let channelu = db.get(`limitedchupdate_${message.guild.id}`)|| "None"
        let channeld =  db.get(`limitedchd_${message.guild.id}`)|| "None"
        let rolesc = db.get(`limitedrole_${message.guild.id}`)|| "None"
        let roleu = db.get(`limitedroleu_${message.guild.id}`) || "None"
        let roled =  db.get(`limitedroled_${message.guild.id}`)|| "None"
        if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
        message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
          .addFields({name:`protection mode`,value:protectionmode},
          {name:`logs channel`,value:`<#` + logs+`>`},
          {name:`bans limites`,value:bans},
          {name:`kicks limites`,value:kicks},
          {name:`create channels limites`,value:channelc},
          {name:`update channels limites`,value:channelu},
          {name:`delete channels limites`,value:channeld},
          {name:`update roles limites`,value:roleu},
          {name:`delete roles limites`,value:roled},
          {name:`create roles limites`,value:rolesc})
           .setTimestamp()
           .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())
        )
      }
      if(command === "help") {
         if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
          .setTitle("protection bot commands:")
          .addField(`**config**`, `\`config\`,\`setlogs\``)
          .addField(`**Settings**`, `\`protection\`,\`set-bans\`,\`set-kicks\`,\`set-channelcreate\`,\`set-channelupdate\`,\`set-channeldelete\`,\`set-rolescreate\`,\`set-rolesupdate\`,\`set-rolesdelete\``)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          let pick = args[0]
          if(pick === "protection") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
            .addField(`**protection mode**`, `to select protection mode: \`on/off\``)
            .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          }
          if(pick === "set-bans") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
            .addField(`**bans protection**`, `to set max bans limites: \`${prefix}set-bans [Number]\``)
             .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          }
          if(pick === "set-kicks") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
            .addField(`**kick protection**`, `to set max kicks limites: \`${prefix}set-kicks [Number]\``)
             .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          }
          if(pick === "set-channelcreate") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
            .addField(`**channels protection**`, `to set max channel create limites: \`${prefix}set-channelcreate [Number]\``)
             .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          }
          if(pick === "set-channelupdate") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
            .addField(`**channels protection**`, `to set max channels updates limites: \`${prefix}set-channelupdate [Number]\``)
             .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          }
          if(pick === "set-channeldelete") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
            .addField(`**channels protection**`, `to set max channels delete limites: \`${prefix}set-channeldelete [Number]\``)
             .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          }
          if(pick === "set-rolescreate") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
            .addField(`**roles protection**`, `to set max roles create limites: \`${prefix}set-rolescreate [Number]\``)
             .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          }
          if(pick === "set-rolesupdate") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
            .addField(`**roles protection**`, `to set max roles update limites: \`${prefix}set-rolesupdate [Number]\``)
             .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          }
          if(pick === "set-rolesdelete") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
            .addField(`**roles protection**`, `to set max roles delete limites: \`${prefix}set-rolesdelete [Number]\``)
             .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          }
        }
      if(command === "setlogs") {
        if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
        if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Invalid channel!. Please Write The ID of channel or mention it.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          let logsch = message.mentions.channels.first()|| message.guild.channels.cache.find(ch => ch.id === args[0])
          if(!logsch) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Invalid channel!. Please Write The ID of channel or mention it.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          db.set(`logsch_${message.guild.id}`, logsch.id)
          message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**✅ || new Logs channel set to: ${logsch}**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          
      }
      if(command === 'protection') {
        if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
        if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must Choose 1 Option. Exemple: \n ${prefix}protection on/off**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(args[0] !== "on" && args[0] !== "off") return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must Choose 1 Option. Exemple: \n ${prefix}protection on/off**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(args[0] === "on") {
              if(db.has(`on_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed()
              .setColor(mainColor)
              .setDescription(`**✅ || protection mode is already \`on\` in this server.**`)
               .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
            db.set(`on_${message.guild.id}`, "on")
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setDescription(`**✅ || protection mode in now: \`on\`**`)
             .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          }
          if(args[0] === "off") {
            if(!db.has(`on_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setDescription(`**✅ || protection mode is already \`off\` in this server.**`)
             .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
            db.delete(`on_${message.guild.id}`)
            message.channel.send(new Discord.MessageEmbed()
            .setColor(mainColor)
            .setDescription(`**✅ || protection mode in now: \`off\`**`))
          }
          
      }
      if(command === "set-bans") {
          if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Numbed Of Max Bans Limites!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Only Numbers!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedban_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**✅ || new max bans limites set to: \`${args[0]}\`**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
      }

});

//////////////////////////////////////////////////////////////////////////////

client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-kicks") {
          if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Numbed Of Max Kicks Limites!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Only Numbers!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedkick_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**✅ || new max Kicks limites set to: \`${args[0]}\`**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
      }

});




//////////////////////////////////////////////////////////////////////////////



client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-channelcreate") {
          if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Numbed Of Max channels Limites!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Only Numbers!.**`))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedchc_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**✅ || new max channels limites set to: \`${args[0]}\`**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
      }

});

//////////////////////////////////////////////////////////////////////////////
client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-rolescreate") {
          if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Numbed Of Max Roles Create Limites!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Only Numbers!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedrole_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**✅ || new max Roles Create limites set to: \`${args[0]}\`**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
      }

});





//////////////////////////////////////////////////////////////////////////////
client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-channelupdate") {
          if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Numbed Of Max Channels Update Limites!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Only Numbers!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedchupdate_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**✅ || new max Channels Update limites set to: \`${args[0]}\`**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
      }

});





//////////////////////////////////////////////////////////////////////////////






client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-rolesupdate") {
          if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Numbed Of Max Roles Update Limites!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Only Numbers!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedroleu_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**✅ || new max Roles Update limites set to: \`${args[0]}\`**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
      }

});





//////////////////////////////////////////////////////////////////////////////




client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-rolesdelete") {
          if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Numbed Of Max Roles Delete Limites!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Only Numbers!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedroled_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**✅ || new max Roles Delete limites set to: \`${args[0]}\`**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
      }

});

//////////////////////////////////////////////////////////////////////////////

client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-channeldelete") {
          if(message.member.user.id !== message.guild.ownerID) return message.channel.send(`**❌|| Only Guild Owner.**`)
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Numbed Of Max Roles Delete Limites!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Only Numbers!.**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedchd_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor(mainColor)
          .setDescription(`**✅ || new max Roles Delete limites set to: \`${args[0]}\`**`)
           .setTimestamp()
      .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL()))
      }

});

//////////////////////////////////////////////////////////////////////////////





client.on('channelUpdate', async (oldChannel, newChannel) => {
    if(oldChannel.type === "dm") return;
    if(newChannel.type === "dm") return;
    if(!db.has(`on_${oldChannel.guild.id}`)) return;
    let logsch = db.get(`logsch_${oldChannel.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await oldChannel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_UPDATE',
	});
    const chupdater = fetchedLogs.entries.first();
    if (!chupdater) return
    const { executor, target } = chupdater;
        if(db.has(`${executor.id}_chupdater`)) {db.add(`${executor.id}_chupdater`, 1)}
        if(!db.has(`${executor.id}_chupdater`)) {db.set(`${executor.id}_chupdater`, 1)}
        if(!db.has(`limitedchupdate_${oldChannel.guild.id}`)) {db.set(`limitedchupdate_${oldChannel.guild.id}`, 15)}
        let rc = newChannel.name
        if(oldChannel.name === rc) rc = "None"
        if(db.has(`${executor.id}_chupdater`)) {
            let createchcounts = db.get(`${executor.id}_chupdater`)
            let maxcreatech = db.get(`limitedchupdate_${oldChannel.guild.id}`)
                let creatchembed1 = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("update channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('updated channel:', `${oldChannel.name}`)
                .addField('New channel name:', `${rc}`)
                .addField(`update count:`, createchcounts)
                .addField(`max updates limite:`, maxcreatech)
                .addField('action taken:', 'roles removed')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())



                let creatchembed = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("update channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('updated channel:', `${oldChannel.name}`)
                .addField('New channel name:', `${rc}`)
                .addField(`update count:`, createchcounts)
                .addField(`max updates limite:`, maxcreatech)
                .addField('action taken:', 'no actions taken.')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())

                if(Number(db.get(`${executor.id}_chupdater`)) <= Number(db.get(`limitedchupdate_${oldChannel.guild.id}`))) {
                    oldChannel.guild.channels.cache.get(db.get(`logsch_${oldChannel.guild.id}`)).send(creatchembed);
                }
                    if(Number(db.get(`${executor.id}_chupdater`)) > Number(db.get(`limitedchupdate_${oldChannel.guild.id}`))) {
                        oldChannel.guild.channels.cache.get(db.get(`logsch_${oldChannel.guild.id}`)).send(creatchembed1);
                        oldChannel.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("MANAGE_CHANNELS")) {
                                oldChannel.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        
	}
});


//////////////////////////////////////////////////////////////////////////////




client.on('channelCreate', async channel => {
    if(channel.type === "dm") return;
    if(!db.has(`on_${channel.guild.id}`)) return;
    let logsch = db.get(`logsch_${channel.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await channel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_CREATE',
	});
    const chdeletor = fetchedLogs.entries.first();
    if (!chdeletor) return
    const { executor, target } = chdeletor;
        if(db.has(`${executor.id}_chc`)) {db.add(`${executor.id}_chc`, 1)}
        if(!db.has(`${executor.id}_chc`)) {db.set(`${executor.id}_chc`, 1)}
        if(!db.has(`limitedchc_${channel.guild.id}`)) {db.set(`limitedchc_${channel.guild.id}`, 15)}

        if(db.has(`${executor.id}_chc`)) {
            let createchcounts = db.get(`${executor.id}_chc`)
            let maxcreatech = db.get(`limitedchc_${channel.guild.id}`)
                let creatchembed1 = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("create channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('created channel:', `${channel.name}`)
                .addField(`create count:`, createchcounts)
                .addField(`max creates limite:`, maxcreatech)
                .addField('action taken:', 'roles removed')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())



                let creatchembed = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("create channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('created channel:', `${channel.name}`)
                .addField(`create count:`, createchcounts)
                .addField(`max creates limite:`, maxcreatech)
                .addField('action taken:', 'no actions taken.')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())

                if(Number(db.get(`${executor.id}_chc`)) <= Number(db.get(`limitedchc_${channel.guild.id}`))) {
                    channel.guild.channels.cache.get(db.get(`logsch_${channel.guild.id}`)).send(creatchembed);
                }
                    if(Number(db.get(`${executor.id}_chc`)) > Number(db.get(`limitedchc_${channel.guild.id}`))) {
                        channel.guild.channels.cache.get(db.get(`logsch_${channel.guild.id}`)).send(creatchembed1);
                        channel.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("MANAGE_CHANNELS")) {
                                channel.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        
	}
});


//////////////////////////////////////////////////////////////////////////////




client.on('roleDelete', async role => {
    if(!db.has(`on_${role.guild.id}`)) return;
    let logsch = db.get(`logsch_${role.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await role.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_DELETE',
	});
    const roledeletor = fetchedLogs.entries.first();
    if (!roledeletor) return
    const { executor, target } = roledeletor;
        if(db.has(`${executor.id}_rd`)) {db.add(`${executor.id}_rd`, 1)}
        if(!db.has(`${executor.id}_rd`)) {db.set(`${executor.id}_rd`, 1)}
        if(!db.has(`limitedroled_${role.guild.id}`)) {db.set(`limitedroled_${role.guild.id}`, 15)}

        if(db.has(`${executor.id}_rd`)) {
            let deletecountrole = db.get(`${executor.id}_rd`)
            let maxdeleterole = db.get(`limitedroled_${role.guild.id}`)
                let deleterembed1 = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role Delete actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('role :', `${role.name}`)
                .addField(`role Delete count:`, deletecountrole)
                .addField(`max role Delete limite :`, maxdeleterole)
                .addField('action taken:', 'roles removed')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())



                let deleterembed = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role Delete actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('role :', `${role.name}`)
                .addField(`role Delete count :`, deletecountrole)
                .addField(`max role Delete limite :`, maxdeleterole)
                .addField('action taken:', 'no actions taken.')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())

                if(Number(db.get(`${executor.id}_rd`)) <= Number(db.get(`limitedroled_${role.guild.id}`))) {
                    role.guild.channels.cache.get(db.get(`logsch_${role.guild.id}`)).send(deleterembed);
                }
                    if(Number(db.get(`${executor.id}_rd`)) > Number(db.get(`limitedroled_${role.guild.id}`))) {
                        role.guild.channels.cache.get(db.get(`logsch_${role.guild.id}`)).send(deleterembed1);
                        role.guild.members.cache.get(executor.id).roles.cache.forEach(rolea => {
                            if(rolea.permissions.has("MANAGE_ROLES")) {
                                role.guild.members.cache.get(executor.id).roles.remove(rolea.id)    
                            }
                        });
                    }
            
            
                
            
        }
});

//////////////////////////////////////////////////////////////////////////////





client.on('roleCreate', async role => {
    if(!db.has(`on_${role.guild.id}`)) return;
    let logsch = db.get(`logsch_${role.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await role.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_CREATE',
	});
    const roledeletor = fetchedLogs.entries.first();
    if (!roledeletor) return
    const { executor, target } = roledeletor;
        if(db.has(`${executor.id}_r`)) {db.add(`${executor.id}_r`, 1)}
        if(!db.has(`${executor.id}_r`)) {db.set(`${executor.id}_r`, 1)}
        if(!db.has(`limitedrole_${role.guild.id}`)) {db.set(`limitedrole_${role.guild.id}`, 15)}

        if(db.has(`${executor.id}_r`)) {
            let createcount = db.get(`${executor.id}_r`)
            let maxcreate = db.get(`limitedrole_${role.guild.id}`)
                let createembed1 = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role create actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('role :', `${role.name}`)
                .addField(`role create count:`, createcount)
                .addField(`max role create limite :`, maxcreate)
                .addField('action taken:', 'roles removed')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())



                let createembed = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role create actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('role :', `${role.name}`)
                .addField(`role create count :`, createcount)
                .addField(`max role create limite :`, maxcreate)
                .addField('action taken:', 'no actions taken.')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())

                if(Number(db.get(`${executor.id}_r`)) <= Number(db.get(`limitedrole_${role.guild.id}`))) {
                    role.guild.channels.cache.get(db.get(`logsch_${role.guild.id}`)).send(createembed);
                }
                    if(Number(db.get(`${executor.id}_r`)) > Number(db.get(`limitedrole_${role.guild.id}`))) {
                        role.guild.channels.cache.get(db.get(`logsch_${role.guild.id}`)).send(createembed1);
                        role.guild.members.cache.get(executor.id).roles.cache.forEach(rolee => {
                            if(rolee.permissions.has("MANAGE_ROLES")) {
                                role.guild.members.cache.get(executor.id).roles.remove(rolee.id)    
                            }
                        });
                    }
            
            
                
            
        
	}
});




//////////////////////////////////////////////////////////////////////////////
client.on('roleUpdate', async (oldRole, newRole) => {
    if(!db.has(`on_${oldRole.guild.id}`)) return;
    let logsch = db.get(`logsch_${oldRole.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await newRole.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_UPDATE',
	});
    const roleu = fetchedLogs.entries.first();
    if (!roleu) return
    const { executor, target } = roleu;
        if(db.has(`${executor.id}_ru`)) {db.add(`${executor.id}_ru`, 1)}
        if(!db.has(`${executor.id}_ru`)) {db.set(`${executor.id}_ru`, 1)}
        if(!db.has(`limitedroleu_${newRole.guild.id}`)) {db.set(`limitedroleu_${newRole.guild.id}`, 15)}
        let rn = oldRole.name
        if(rn === oldRole.name) rn = 'None'
        if(db.has(`${executor.id}_ru`)) {
            let updatecounte = db.get(`${executor.id}_ru`)
            let maxupdate = db.get(`limitedroleu_${newRole.guild.id}`)
                let updateroleembed1 = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role Update actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})`)
                .addField('old role name :', `${oldRole.name}`)
                .addField('new name :', rn)
                .addField(`role Update count:`, updatecounte)
                .addField(`max role update limite :`, maxupdate)
                .addField('action taken:', 'roles removed')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())



                let updateroleembed = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role update actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})`)
                .addField('role :', `${oldRole.name}`)
                .addField('new name :', rn)
                .addField(`role update count :`, updatecounte)
                .addField(`max role update limite :`, maxupdate)
                .addField('action taken:', 'no actions taken.')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())

                if(Number(db.get(`${executor.id}_ru`)) <= Number(db.get(`limitedroleu_${newRole.guild.id}`))) {
                    oldRole.guild.channels.cache.get(db.get(`logsch_${oldRole.guild.id}`)).send(updateroleembed);
                }
                    if(Number(db.get(`${executor.id}_ru`)) > Number(db.get(`limitedroleu_${newRole.guild.id}`))) {
                        oldRole.guild.channels.cache.get(db.get(`logsch_${oldRole.guild.id}`)).send(updateroleembed1);
                        oldRole.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("MANAGE_ROLES")) {
                                newRole.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        }
});

//////////////////////////////////////////////////////////////////////////////





client.on('guildMemberRemove', async member => {
    if(!db.has(`on_${member.guild.id}`)) return;
    let logsch = db.get(`logsch_${member.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
    const banlog = fetchedLogs.entries.first();
    if (!banlog) return
    const { executor, target } = banlog;
    if (target.id === member.id) {
        if(db.has(`${executor.id}_kicks`)) {db.add(`${executor.id}_kicks`, 1)}
        if(!db.has(`${executor.id}_kicks`)) {db.set(`${executor.id}_kicks`, 1)}

        if(!db.has(`limitedkick_${member.guild.id}`)) {db.set(`limitedkick_${member.guild.id}`, 15)}

        if(db.has(`${executor.id}_kicks`)) {
            let kickscount = db.get(`${executor.id}_kicks`)
            let maxkicks = db.get(`limitedkick_${member.guild.id}`)
                let kicksembed = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("kick actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('kicked member:', `${member.user.tag}(${member.user.id}`)
                .addField(`kick count:`, kickscount)
                .addField(`max kicks limite:`, maxkicks)
                .addField('action taken:', 'roles removed')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())


                let kickembed1 = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("kick actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('kicked member:', `${member.user.tag}(${member.user.id}`)
                .addField(`kicks count:`, kickscount)
                .addField(`max kicks limite:`, maxkicks)
                .addField('action taken:', 'no actions taken.')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())

                if(Number(db.get(`${executor.id}_kicks`)) <= Number(db.get(`limitedkick_${member.guild.id}`))) {
                    member.guild.channels.cache.get(db.get(`logsch_${member.guild.id}`)).send(kickembed1);
                }
                    if(Number(db.get(`${executor.id}_kicks`)) > Number(db.get(`limitedkick_${member.guild.id}`))) {
                        member.guild.channels.cache.get(db.get(`logsch_${member.guild.id}`)).send(kicksembed);
                        member.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("KICK_MEMBERS")) {
                                member.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        }
	}
});


//////////////////////////////////////////////////////////////////////////////
client.on('channelDelete', async channel => {
    if(channel.type === "dm") return;
    if(!db.has(`on_${channel.guild.id}`)) return;
    let logsch = db.get(`logsch_${channel.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await channel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_DELETE',
	});
    const chdeletor = fetchedLogs.entries.first();
    if (!chdeletor) return
    const { executor, target } = chdeletor;
        if(db.has(`${executor.id}_chd`)) {db.add(`${executor.id}_chd`, 1)}
        if(!db.has(`${executor.id}_chd`)) {db.set(`${executor.id}_chd`, 1)}
        if(!db.has(`limitedchd_${channel.guild.id}`)) {db.set(`limitedchd_${channel.guild.id}`, 15)}

        if(db.has(`${executor.id}_chd`)) {
            let deletescount = db.get(`${executor.id}_chd`)
            let maxdeletes = db.get(`limitedchd_${channel.guild.id}`)
                let deletechembed1 = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("delete channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('delete channel:', `${channel.name}`)
                .addField(`delete count:`, deletescount)
                .addField(`max deletes limite:`, maxdeletes)
                .addField('action taken:', 'roles removed')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())


                let deletechembed = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("delete channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('deleted channel:', `${channel.name}`)
                .addField(`delete count:`, deletescount)
                .addField(`max deletes limite:`, maxdeletes)
                .addField('action taken:', 'no actions taken.')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())

                if(Number(db.get(`${executor.id}_chd`)) <= Number(db.get(`limitedchd_${channel.guild.id}`))) {
                    channel.guild.channels.cache.get(db.get(`logsch_${channel.guild.id}`)).send(deletechembed);
                }
                    if(Number(db.get(`${executor.id}_chd`)) > Number(db.get(`limitedchd_${channel.guild.id}`))) {
                        channel.guild.channels.cache.get(db.get(`logsch_${channel.guild.id}`)).send(deletechembed1);
                        channel.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("MANAGE_CHANNELS")) {
                                channel.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        
	}
});


//////////////////////////////////////////////////////////////////////////////

client.on('guildMemberRemove', async member => {
    if(!db.has(`on_${member.guild.id}`)) return;
    let logsch = db.get(`logsch_${member.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN',
	});
    const kickLog = fetchedLogs.entries.first();
    if (!kickLog) return
    const { executor, target } = kickLog;
    if (target.id === member.id) {
        if(db.has(`${executor.id}_bans`)) {db.add(`${executor.id}_bans`, 1)}
        if(!db.has(`${executor.id}_bans`)) {db.set(`${executor.id}_bans`, 1)}

        if(!db.has(`limitedban_${member.guild.id}`)) {db.set(`limitedban_${member.guild.id}`, 15)}

        if(db.has(`${executor.id}_bans`)) {
            let banscount = db.get(`${executor.id}_bans`)
            let maxbans = db.get(`limitedban_${member.guild.id}`)
                let bansembed = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("ban actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField(`bans count:`, banscount)
                .addField(`max bans limite:`, maxbans)
                .addField('action taken:', 'roles removed')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())



                let bansembed1 = new Discord.MessageEmbed()
                .setColor(mainColor)
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("ban actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('banned member:', `${member.user.tag}(${member.user.id}`)
                .addField(`bans count:`, banscount)
                .addField(`max bans limite:`, maxbans)
                .addField('action taken:', 'no actions taken.')
                .setTimestamp()
                .setFooter(`PrimeBot  •  Requested by ${message.author.username}`,message.author.avatarURL())

                if(Number(db.get(`${executor.id}_bans`)) <= Number(db.get(`limitedban_${member.guild.id}`))) {
                    client.channels.cache.get(db.get(`logsch_${member.guild.id}`)).send(bansembed1);
                }
                    if(Number(db.get(`${executor.id}_bans`)) > Number(db.get(`limitedban_${member.guild.id}`))) {
                        client.channels.cache.get(db.get(`logsch_${member.guild.id}`)).send(bansembed);
                        member.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("BAN_MEMBERS")) {
                                member.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        }
	}
})

//////////////////////////////////////////////////////////////////////////////


client.login(process.env.token)