const express = require('express')
const app = express()

// set server
const port = 3000
app.listen(port, () => {
  console.log(`the appliecation is running on port ${port}`)
})

// routing for testing
app.get('/', (req, res) => {
  res.send('success')
})
