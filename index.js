const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config')

let channels = {}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  if (channels[message.channel.id])
    channels[message.channel.id]++
  else
    channels[message.channel.id] = 1
})

setInterval(() => {
  const hot = []
  const maximum = Math.max(Object.keys(channels))
  if (!maximum) {
    if (config.channel && config.zero)
      client.channels.get(config.channel)
        .send('今、HOTなチャンネルはありません')
  } else {
    for (const id in channels)
      if (channels[id] === maximum)
        hot.push(id)
    if (config.channel)
      client.channels.get(config.channel)
        .send(`今、一番HOTなチャンネルは <#${hot.join('> <#')}> です！`)
    channels = {}
  }
}, config.delay)

client.login(config.token)
