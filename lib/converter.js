const ffmpeg = require('fluent-ffmpeg')
const { tmpdir } = require('os')
const { join } = require('path')
const { writeFileSync, unlinkSync } = require('fs')

async function imageToWebp(imageBuffer) {
  const tmpInput = join(tmpdir(), ${Date.now()}.jpg)
  const tmpOutput = tmpInput.replace('.jpg', '.webp')
  writeFileSync(tmpInput, imageBuffer)

  return new Promise((resolve, reject) => {
    ffmpeg(tmpInput)
      .outputOptions(['-vcodec', 'libwebp'])
      .save(tmpOutput)
      .on('end', () => {
        const data = require('fs').readFileSync(tmpOutput)
        unlinkSync(tmpInput)
        unlinkSync(tmpOutput)
        resolve(data)
      })
      .on('error', reject)
  })
}

module.exports = { imageToWebp }
