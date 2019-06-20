require('dotenv').config()

const fs = require('fs')
const olt = require('olt')
const wol = require('wol')
const path = require('path')
const micro = require('micro')

const PORT = process.env.PORT || 3000

const WOLTH_MAC = process.env.WOLTH_MAC
const WOLTH_ADDRESS = process.env.WOLTH_ADDRESS || '255.255.255.255'
const WOLTH_PORT = +process.env.WOLTH_PORT || 9

const homepage = olt(fs.readFileSync(path.resolve(__dirname, './www/index.html'), 'utf8'))

const wolth = async (req) => {
  if (req.method !== 'POST') {
    return homepage({
      WOLTH_MAC,
      WOLTH_ADDRESS,
      WOLTH_PORT,
      endpoint: req.headers.host,
    })
  }
  await wol.wake(WOLTH_MAC, {
    address: WOLTH_ADDRESS,
    port: WOLTH_PORT,
  })
  return 'OK'
}

module.exports = wolth

if (!module.parent) {
  const server = micro(wolth)
  server.listen(PORT, () =>
    console.log(`Wolth is serving on http://127.0.0.1:${PORT}`)
  )
}
