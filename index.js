const express = require('express')
const moment = require('moment')
const path = require('path');
const app = express()
const port = 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let redirectError = (req, res, next) => {
  res.status(404).render('Error');
  next()
}

let log = (req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let path = req.originalUrl;
  let now = moment();

  console.log('[' + now.format('L') + ' ' + ip + '] ' + path)
  next()
}

app.use(log)

app.get('/', (req, res) => {
  res.render('Hello')
})

app.use(redirectError)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})