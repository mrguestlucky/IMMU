const fs = require('fs')

// Optional: Load .env if available
if (fs.existsSync('.env')) require('dotenv').config({ path: __dirname + '/.env' })

// Helper to convert string to boolean (true only if 'true', case-insensitive)
const toBool = (value, defaultValue = false) => {
  if (typeof value === 'undefined') return defaultValue
  return value.toString().toLowerCase() === 'true'
}

// Global bot settings
global.SESSION_ID = process.env.SESSION_ID || ''
global.PREFIX = process.env.PREFIXZ || '.'
global.mode = process.env.MODE || 'public'
global.botname = process.env.BOT_NAME || 'IMMU MD'
global.ownernumber = process.env.OWNER_NUMBER || '919142294671'
global.antidelete = process.env.ANTIDELETE || 'private'
global.statusemoji = (process.env.STATUS_EMOJI || "🧡,💚,🔥,✨,❤️,🥰,😎").split(',')
global.antiLinkGroups = {}
global.timezones = process.env.TIMEZONE || "Pakistan/Karachi"

// Boolean environment settings
global.autotyping = toBool(process.env.AUTO_TYPING)
global.autorecording = toBool(process.env.AUTO_RECORDING)
global.autoread = toBool(process.env.AUTO_READ)
global.autoreact = toBool(process.env.AUTO_REACT)
global.alwaysonline = toBool(process.env.ALWAYS_ONLINE)
global.autoviewstatus = toBool(process.env.AUTO_STATUS_VIEW)
global.autoreactstatus = toBool(process.env.AUTO_STATUS_REACT)
global.antigroupmention = toBool(process.env.ANTI_GROUP_MENTION)

// Watch for changes and reload this file if updated
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(`🔁 Reloaded global settings: '${__filename}'`)
  delete require.cache[file]
  require(file)
})
