const { writeExifImg } = require('./exif')
const { imageToWebp } = require('./converter')

async function writeExif(media, options) {
  let webp = await imageToWebp(media)
  return await writeExifImg(webp, options)
}

module.exports = { writeExif }
