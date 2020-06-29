module.exports = {
  async user(client, message, str) {
    if (!client) throw new Error("Client is not defined.")
    if (!message) throw new Error("Message is not defined.")
    if (!str) throw new Error("User string is not defined.")

    setTimeout(() => {throw new Error("Could not find the User. Timed out.")}, 60000);

    let userCache = client.users.cache
    let user;

    if (str.startsWith('<@') && str.endsWith('>')) {
  		   str = str.slice(2, -1);
        if (str.startsWith('!')) {
          str = str.slice(1);
  	    }
  	    user = userCache.get(str)
    }

    user = userCache.filter(u => u.tag.toLowerCase().includes(str.toLowerCase())).size >= 1 ? userCache.filter(u => u.tag.toLowerCase().includes(str.toLowerCase())).array() : false

    user = user || userCache.get(str)

    if (Array.isArray(user) && user.length > 1) {
      let usermsg = "";
      for (let i = 0; i < (user.length > 10 ? 10 : user.length); i++) {
        usermsg += `\n${i + 1} -> ${user[i].tag}`;
      }

      let msg = await message.channel.send("", {embed: {description: `**There are multiple users found with name '${str}', which one would you like to use?** \n${usermsg}`, footer: {text: "You have 30 seconds to respond."}, timestamp: Date.now()}});
      let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] })
      if (Number(collected.first().content) > user.length) return message.channel.send(":x: | Invalid number. Command cancelled.");
      user = user[collected.first().content - 1]
      msg.delete()
    } else {
      user = Array.isArray(user) ? user[0] : user
    }

    return user;
  },

  async guildMember(client, message, str) {
    if (!client) throw new Error("Client is not defined.")
    if (!message) throw new Error("Message is not defined.")
    if (!str) throw new Error("User string is not defined.")

    setTimeout(() => {throw new Error("Could not find the User. Timed out.")}, 60000);

    let memberCache = message.guild.members.cache
    let member;

    if (str.startsWith('<@') && str.endsWith('>')) {
      str = str.slice(2, -1);
      if (str.startsWith('!')) {
        str = str.slice(1);
  		}
  		member = memberCache.get(str)
    }

    member = memberCache.filter(m => m.user.tag.toLowerCase().includes(str.toLowerCase())).size >= 1 ? memberCache.filter(m => m.user.tag.toLowerCase().includes(str.toLowerCase())).array() : false

    member = member || memberCache.get(str)

    if (Array.isArray(member) && member.length > 1) {
      let membermsg = "";
      for (let i = 0; i < (member.length > 10 ? 10 : member.length); i++) {
        membermsg += `\n${i + 1} -> ${member[i].user.tag}`;
      }

      let msg = await message.channel.send("", {embed: {description: `**There are multiple members found with name '${str}', which one would you like to use?** \n${membermsg}`, footer: {text: "You have 30 seconds to respond."}, timestamp: Date.now()}});
      let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] })
      if (Number(collected.first().content) > member.length) return message.channel.send(":x: | Invalid number. Command cancelled.");
      member = member[collected.first().content - 1]
      msg.delete()
    } else {
      member = Array.isArray(member) ? member[0] : member
    }

    return member;
  },

  async channel(client, message, str) {
    if (!client) throw new Error("Client is not defined.")
    if (!message) throw new Error("Message is not defined.")
    if (!str) throw new Error("User string is not defined.")

    setTimeout(() => {throw new Error("Could not find the Channel. Timed out.")}, 60000);

    let channelCache = message.guild.channels.cache
    let channel;

    if (str.startsWith('<#') && str.endsWith('>')) {
      str = str.slice(2, -1);
      channel = channelCache.get(str)
    }

    channel = channelCache.filter(c => c.name.toLowerCase().includes(str.toLowerCase())).size >= 1 ? channelCache.filter(c => c.name.toLowerCase().includes(str.toLowerCase())).array() : undefined

    channel = channel || channelCache.get(str)

    if (Array.isArray(channel) && channel.length > 1) {
      let channelmsg = "";
      for (let i = 0; i < (channel.length > 10 ? 10 : channel.length); i++) {
        channelmsg += `\n${i + 1} -> ${channel[i]} - Pos: ${channel[i].position}`;
      }

      let msg = await message.channel.send("", {embed: {description: `**There are multiple channels found with name '${str}', which one would you like to use?** \n${channelmsg}`, footer: {text: "You have 30 seconds to respond."}, timestamp: Date.now()}});
      let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] })
      if (Number(collected.first().content) > channel.length) return message.channel.send(":x: | Invalid number. Command cancelled.");
      channel = channel[collected.first().content - 1]
      msg.delete()
    } else {
      channel = Array.isArray(channel) ? channel[0] : channel
    }

    return channel;
  },

  async role(client, message, str) {
    if (!client) throw new Error("Client is not defined.")
    if (!message) throw new Error("Message is not defined.")
    if (!str) throw new Error("User string is not defined.")

    setTimeout(() => {throw new Error("Could not find the Role. Timed out.")}, 60000);

    let roleCache = message.guild.roles.cache
    let role;

    if (str.startsWith('<@&') && str.endsWith('>')) {
      str = str.slice(3, -1);
      role = roleCache.get(str)
  	}

    role = roleCache.filter(r => r.name.toLowerCase().includes(str.toLowerCase())).size >= 1 ? roleCache.filter(r => r.name.toLowerCase().includes(str.toLowerCase())).array() : undefined

    role = role || roleCache.get(str)

    if (Array.isArray(role) && role.length > 1) {
      let rolemsg = "";
      for (let i = 0; i < (role.length > 10 ? 10 : role.length); i++) {
        rolemsg += `\n${i + 1} -> ${role[i]}`;
      }

      let msg = await message.channel.send("", {embed: {description: `**There are multiple roles found with name '${str}', which one would you like to use?** \n${rolemsg}`, footer: {text: "You have 30 seconds to respond."}, timestamp: Date.now()}});
      let collected = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] })
      if (Number(collected.first().content) > role.length) return message.channel.send(":x: | Invalid number. Command cancelled.");
      role = role[collected.first().content - 1]
      msg.delete()
    } else {
      role = Array.isArray(role) ? role[0] : role
    }

    return role;
  }

}
