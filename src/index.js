require('dotenv').config()

const wol = require('wol')
const micro = require('micro')

const PORT = process.env.PORT || 3000

const WOLTH_MAC = process.env.WOLTH_MAC
const WOLTH_ADDRESS = process.env.WOLTH_ADDRESS || '255.255.255.255'
const WOLTH_PORT = +process.env.WOLTH_PORT || 9

const help = ({ endpoint }) => `
# WOLTH

## Usage
\`\`\`bash
$ curl -X POST http://${endpoint}/
\`\`\`

## More
[GitHub](https://github.com/imyelo/wolth)
`.trim()

const wolth = async (req) => {
  if (req.method !== 'POST') {
    return help({ endpoint: req.headers.host })
  }
  await wol(WOLTH_MAC, {
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
