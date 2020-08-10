const path = require('path')
const express = require('express')
const app = express()
const buildPath = path.join(__dirname, 'build')
const port = process.env.PORT || 3000

console.log('Starting server.js...')

app.use(express.static(buildPath))

app.get('*', (req, res) => {
  console.log('Received GET request!')
  res.sendFile(path.join(buildPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
