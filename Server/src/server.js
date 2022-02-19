const express = require('express')
const connect = require('./config/db')
const app = require('./index')

app.listen(2345, async () => {
  await connect()

  console.log(`listening to the port 2345`)
})
