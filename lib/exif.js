const { writeFileSync } = require('fs')
const { tmpdir } = require('os')
const { join } = require('path')

function writeExifImg(buffer, options = {}) {
  const metadata = {
    "sticker-pack-id": "com.imad.bot",
    "sticker-pack-name": options.packname || "IMMU-MD",
    "sticker-pack-publisher": options.author || "By Imad Ali",
    "emojis": ["🦄"]
  }

  const json = Buffer.from(JSON.stringify(metadata), 'utf8')
  const exifAttr = Buffer.concat([
    Buffer.from([0x49, 0x49, 0x2A, 0x00]),
    Buffer.from([0x08, 0x00, 0x00, 0x00]),
    Buffer.from([0x01, 0x00]),
    Buffer.from([0x1C, 0x01]),
    Buffer.from([0x07, 0x00]),
    Buffer.from([json.length]),
    Buffer.from([0x00, 0x00, 0x00, 0x00]),
    json
  ])

  return Buffer.concat([buffer, exifAttr])
}

module.exports = { writeExifImg }
