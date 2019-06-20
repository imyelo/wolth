require('dotenv').config()

const wol = require('wol')
const micro = require('micro')

const PORT = process.env.PORT || 3000

const WOLTH_MAC = process.env.WOLTH_MAC
const WOLTH_ADDRESS = process.env.WOLTH_ADDRESS || '255.255.255.255'
const WOLTH_PORT = +process.env.WOLTH_PORT || 9

const help = ({ endpoint }) => `
<html>
  <head>
    <title>Wolth</title>
    <link rel="stylesheet" href="//unpkg.com/hack@0.8.1/dist/hack.css" />
  </head>
  <body class="hack">
    <div class="container">
      <h1>WOLTH</h1>
      <p>Wake with curl:</p>

      <pre>$ curl -X POST http://${endpoint}/</pre>

      <p>Or just a click:</p>

      <form method="POST">
        <button class="btn btn-primary">Wake</button>
      </form>

      <hr/>

      <p><a href="https://github.com/imyelo/wolth" target="_blank">README</a></p>
    </div>
  </body>
</html>
`.trim()

const wolth = async (req) => {
  if (req.method !== 'POST') {
    return help({ endpoint: req.headers.host })
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
