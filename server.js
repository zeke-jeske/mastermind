const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'build')))

// Redirect all GET requests to the root
app.get('*', (req, res) => {
  res.redirect('/')
})
;(() => {
  const port = process.env.PORT || 5000
  app.listen(port, () => console.log(`Server started on port ${port}`))
})()
