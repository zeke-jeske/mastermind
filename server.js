const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(process.env.PORT || 5000)
