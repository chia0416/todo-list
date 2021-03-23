const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')

const app = express()

//藉由mongoose串接mongodb文件資料庫
mongoose.connect("mongodb://localhost/todo-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.on('error', () => {
  console.log("mongobd error!")
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//架設handlebars模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//使用bodyPareser捕捉POST的回傳資料
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})